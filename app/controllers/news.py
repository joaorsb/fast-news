from typing import List
from datetime import datetime

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine, query, ObjectId

from ..models import NewsModel, UsersModel, NewsSchema

router = APIRouter()

client = AsyncIOMotorClient("mongodb://localhost:27017/")
engine = AIOEngine(motor_client=client, database="fast_news")

@router.get("/", response_model=List[NewsModel])
async def root():
    """
        Get news
    :return: List of all news
    """
    news = await engine.find(NewsModel)
    return news

@router.put("/add/", response_model=NewsModel)
async def create_news(news: NewsModel):
    await engine.save(news)
    return news

@router.patch("/edit/{id}/", response_model=NewsModel)
async def update_news(id: ObjectId, patch: NewsSchema):
    news = await engine.find_one(NewsModel, NewsModel.id == id)
    if news is None:
        raise HTTPException(status_code=404, detail=f"News with id {id} not found")

    patch_dict = patch.dict(exclude_unset=True)
    for name, value in patch_dict.items():
        setattr(news, name, value)

    news.updated = datetime.utcnow()
    await engine.save(news)
    return news

@router.get("/title/{title}/", response_model=List[NewsModel])
async def get_news_by_title(title: str):
    news = await engine.find(NewsModel, query.match(NewsModel.title, r"{}".format(title)))
    if news is None:
        raise HTTPException(status_code=404, detail=f"News with title {title} not found")
    return news

@router.get("/author/{name}/", response_model=List[NewsModel])
async def get_news_by_author(name: str):
    author = await engine.find_one(UsersModel, query.match(UsersModel.name, r"{}".format(name)))
    if author is None:
        raise HTTPException(status_code=404, detail=f"Author {name} not found")
    
    news = await engine.find(NewsModel, query.eq(NewsModel.author_id, str(author.id)))

    if news:
        return news
        
    raise HTTPException(status_code=404, detail=f"News from author {name} not found")
    

@router.delete("/delete/{id}/", response_model=NewsModel)
async def delete_news(id: ObjectId):
    news = await engine.find_one(NewsModel, NewsModel.id == id)
    if news is None:
        raise HTTPException(status_code=404, detail=f"News {id} not found")
    await engine.delete(news)
    return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)