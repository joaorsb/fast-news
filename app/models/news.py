from datetime import datetime
from typing import Optional

from odmantic import Model, Reference
from pydantic import BaseModel
from .user import UsersModel

class NewsModel(Model):
    title: str
    body: str
    author_id: str
    created: datetime = datetime.utcnow()
    updated: datetime = datetime.utcnow()

    class Config:
        collection = 'news'
        schema_extra = {
            "example": {
                "title": "This is the breaking news",
                "body": "An Absolutely great news!",
                "author_id": "61566f9d226cdb7e91606dde"
            }
        }

class NewsSchema(BaseModel):
    title: str
    body: str