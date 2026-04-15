import os

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import auth
import crud
from database import engine, localSession
from models import Base, User
from schemas import AdminCredentials, AdminStatus, ArticleData, ArticleId, AuthToken, SessionInfo, UserPublic

Base.metadata.create_all(bind=engine)

app = FastAPI()

ENVIRONMENT = os.getenv('ENVIRONMENT', 'development').lower()
cors_origins_raw = os.getenv('CORS_ORIGINS', 'http://localhost:5173')
origin = [item.strip() for item in cors_origins_raw.split(',') if item.strip()]
if ENVIRONMENT == 'production' and not origin:
    raise RuntimeError('CORS_ORIGINS must be configured in production.')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*']
)



def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()



def _extract_bearer_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authorization header required',
        )

    scheme, _, token = authorization.partition(' ')
    if scheme.lower() != 'bearer' or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Bearer token required',
        )
    return token



def _authenticate_admin(db: Session, credentials: AdminCredentials) -> User | None:
    user = crud.get_user_by_name(db=db, name=credentials.username)
    if user is None:
        return None

    if not auth.verify_password(credentials.password, user.password):
        return None

    if auth.is_legacy_password(user.password):
        crud.update_user_password(db=db, user=user, password_hash=auth.hash_password(credentials.password))

    return user



def get_current_admin(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> User:
    token = _extract_bearer_token(authorization)
    payload = auth.decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired session',
        )

    username = payload['sub']
    user = crud.get_user_by_name(db=db, name=username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Admin user not found',
        )

    return user


@app.get('/')
def root():
    return 'Holaa'


@app.get('/health')
def healthcheck():
    return {'status': 'ok', 'environment': ENVIRONMENT}


@app.get('/api/admin/status', response_model=AdminStatus)
def get_admin_status(db: Session = Depends(get_db)):
    return AdminStatus(has_admin=crud.get_user_count(db=db) > 0)


@app.post('/api/admin/setup', response_model=AuthToken, status_code=status.HTTP_201_CREATED)
def setup_admin(credentials: AdminCredentials, db: Session = Depends(get_db)):
    if crud.get_user_count(db=db) > 0:
        raise HTTPException(status_code=409, detail='Admin user already configured')

    if crud.get_user_by_name(db=db, name=credentials.username):
        raise HTTPException(status_code=400, detail='User already exists')

    user = crud.create_user(
        db=db,
        username=credentials.username,
        password_hash=auth.hash_password(credentials.password),
    )
    return AuthToken(access_token=auth.create_access_token(user.name), username=user.name)


@app.post('/api/admin/login', response_model=AuthToken)
def login_admin(credentials: AdminCredentials, db: Session = Depends(get_db)):
    user = _authenticate_admin(db=db, credentials=credentials)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or password',
        )

    return AuthToken(access_token=auth.create_access_token(user.name), username=user.name)


@app.get('/api/admin/session', response_model=SessionInfo)
def get_admin_session(current_admin: User = Depends(get_current_admin)):
    return SessionInfo(username=current_admin.name)


@app.get('/api/users/', response_model=list[UserPublic])
def get_users(
    db: Session = Depends(get_db),
    _current_admin: User = Depends(get_current_admin),
):
    return crud.get_users(db=db)


@app.get('/api/users/{id:int}', response_model=UserPublic)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    _current_admin: User = Depends(get_current_admin),
):
    user_by_id = crud.get_user_by_id(db=db, id=id)
    if user_by_id:
        return user_by_id
    raise HTTPException(status_code=404, detail='User not found')


@app.get('/api/articles/', response_model=list[ArticleId])
def get_articles(db: Session = Depends(get_db)):
    return crud.get_articles(db=db)


@app.get('/api/articles/{id:int}', response_model=ArticleId)
def get_article(id: int, db: Session = Depends(get_db)):
    article_by_id = crud.get_article_by_id(db=db, id=id)
    if article_by_id:
        return article_by_id
    raise HTTPException(status_code=404, detail='Article not found')


@app.post('/api/articles/', response_model=ArticleId)
def create_article(
    article: ArticleData,
    db: Session = Depends(get_db),
    _current_admin: User = Depends(get_current_admin),
):
    check_title = crud.get_article_by_title(db=db, title=article.title)
    if check_title:
        raise HTTPException(status_code=400, detail='Title already exists')
    return crud.create_article(db=db, article=article)


@app.put('/api/articles/{id}', response_model=ArticleId)
def update_article(
    id: int,
    article: ArticleData,
    db: Session = Depends(get_db),
    _current_admin: User = Depends(get_current_admin),
):
    check_title = crud.get_article_by_title(db=db, title=article.title)
    if check_title and check_title.id != id:
        raise HTTPException(status_code=400, detail='Title already exists')

    updated_article = crud.update_article(db=db, id=id, article=article)
    if updated_article is None:
        raise HTTPException(status_code=404, detail='Article not found')
    return updated_article


@app.delete('/api/articles/{article_id}', response_model=ArticleId)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    _current_admin: User = Depends(get_current_admin),
):
    db_article = crud.get_article_by_id(db=db, id=article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail='Article not found')

    crud.delete_article(db=db, article=db_article)
    return db_article
