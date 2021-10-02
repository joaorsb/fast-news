from typing import List

from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

from ..models import UsersModel

router = APIRouter()

client = AsyncIOMotorClient("mongodb://localhost:27017/")
engine = AIOEngine(motor_client=client, database="fast_news")

@router.get("/", response_model=List[UsersModel])
async def root():
    """
        Get users
    :return: List of all users
    """
    users = await engine.find(UsersModel)

    return users

@router.put("/add", response_model=UsersModel)
async def create_user(user: UsersModel):
    email = user.email
    user_exists = await engine.find_one(UsersModel, UsersModel.email == email)
    if user_exists is not None:
        raise HTTPException(status_code=400, detail=f"User with email {email} already exists")
    await engine.save(user)
    return user

@router.get("/user/{email}", response_model=UsersModel)
async def get_user_by_email(email: str):
    user = await engine.find_one(UsersModel, UsersModel.email == email)
    if user is None:
        raise HTTPException(status_code=404, detail=f"User with email {email} not found")
    return user

@router.delete("/user/{email}", response_model=UsersModel)
async def delete_user(email: str):
    user = await engine.find_one(UsersModel, UsersModel.email == email)
    if user is None:
        raise HTTPException(404)
    await engine.delete(user)
    return user