from pydantic import BaseModel

class ArticleData(BaseModel):
    title: str
    description: str
    img: str | None = None
    body: str | None = None
    section: str | None = None


class UserData(BaseModel):
    name: str
    password: str

class ArticleId(ArticleData):
    id: int

class UserId(UserData):
    id: int