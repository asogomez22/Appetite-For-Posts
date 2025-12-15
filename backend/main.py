from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import crud
from database import engine, localSession
from schemas import UserData, UserId, ArticleData, ArticleId
from models import Base

Base.metadata.create_all(bind = engine)

app = FastAPI()

origin = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origin,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def root():
    return 'Holaa'

# DECORADORES USUARIOS

@app.get('/api/users/', response_model=list[UserId])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

@app.get('/api/users/{id:int}', response_model=UserId)
def get_user(id, db: Session = Depends(get_db)):
    user_by_id = crud.get_user_by_id(db = db, id = id)
    if user_by_id:
        return user_by_id
    raise HTTPException(status_code=404, detail='User not found')

@app.post('/api/users/', response_model=UserId)
def create_user(user: UserData, db: Session = Depends(get_db)):
    check_name = crud.get_user_by_name(db = db, name=user.name)
    if check_name:
        raise HTTPException(status_code=400, detail='User already exist.')
    return crud.create_user(db = db, user=user)


# DECORADORES ARTICULOS

@app.get('/api/articles/', response_model=list[ArticleId])
def get_articles(db: Session = Depends(get_db)):
    return crud.get_articles(db=db)

@app.get('/api/articles/{id:int}' , response_model=ArticleId)
def get_article(id, db: Session = Depends(get_db)):
    # Corregido el error tipográfico ":8" que tenías aquí
    article_by_id = crud.get_article_by_id(db = db, id = id)
    if article_by_id:
        return article_by_id
    raise HTTPException(status_code=404, detail='Article not found')

@app.post('/api/articles/', response_model=ArticleId)
def create_article(article: ArticleData, db: Session = Depends(get_db)):
    check_title = crud.get_article_by_title(db = db, title=article.title)
    if check_title:
        raise HTTPException(status_code=400, detail='Title already exist.')
    return crud.create_article(db = db, article=article)

# --- NUEVO ENDPOINT PARA EDITAR ---
@app.put('/api/articles/{id}', response_model=ArticleId)
def update_article(id: int, article: ArticleData, db: Session = Depends(get_db)):
    updated_article = crud.update_article(db=db, id=id, article=article)
    if updated_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return updated_article
# ----------------------------------

@app.delete("/api/articles/{article_id}", response_model=ArticleId)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    db_article = crud.get_article_by_id(db=db, id=article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")

    crud.delete_article(db=db, article=db_article)
    return db_article