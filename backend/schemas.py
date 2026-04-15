from pydantic import BaseModel, ConfigDict, Field


class ArticleData(BaseModel):
    title: str
    description: str
    img: str | None = None
    body: str | None = None
    section: str | None = None


class ArticleId(ArticleData):
    id: int
    model_config = ConfigDict(from_attributes=True)


class UserPublic(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class AdminCredentials(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    password: str = Field(min_length=6, max_length=128)


class AdminStatus(BaseModel):
    has_admin: bool


class AuthToken(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    username: str


class SessionInfo(BaseModel):
    username: str
