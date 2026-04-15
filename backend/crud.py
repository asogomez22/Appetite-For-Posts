from sqlalchemy.orm import Session

from models import Article, User



def get_users(db: Session):
    return db.query(User).all()



def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()



def get_user_by_name(db: Session, name: str):
    return db.query(User).filter(User.name == name).first()



def get_user_count(db: Session) -> int:
    return db.query(User).count()



def create_user(db: Session, username: str, password_hash: str):
    new_user = User(name=username, password=password_hash)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user



def update_user_password(db: Session, user: User, password_hash: str):
    user.password = password_hash
    db.commit()
    db.refresh(user)
    return user



def get_articles(db: Session):
    return db.query(Article).all()



def get_article_by_id(db: Session, id: int):
    return db.query(Article).filter(Article.id == id).first()



def get_article_by_title(db: Session, title: str):
    return db.query(Article).filter(Article.title == title).first()



def create_article(db: Session, article):
    new_article = Article(
        title=article.title,
        description=article.description,
        img=article.img,
        body=article.body,
        section=article.section,
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return new_article



def update_article(db: Session, id: int, article):
    db_article = db.query(Article).filter(Article.id == id).first()
    if db_article:
        db_article.title = article.title
        db_article.description = article.description
        db_article.img = article.img
        db_article.body = article.body
        db_article.section = article.section
        db.commit()
        db.refresh(db_article)
    return db_article



def delete_article(db: Session, article: Article):
    db.delete(article)
    db.commit()
    return article
