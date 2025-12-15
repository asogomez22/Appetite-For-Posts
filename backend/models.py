from sqlalchemy import Column, String, Integer

from database import Base

class Article(Base):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(60), index = True, unique = True)
    description = Column(String (120), index = True)
    img = Column(String (1000))
    body = Column(String(5000))
    section = Column(String(100))

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(30), index = True, unique = True)
    password = Column(String (50), index = True)