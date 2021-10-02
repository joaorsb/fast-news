from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from asgi_lifespan import LifespanManager

from .controllers import NewsRouter, UsersRouter


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    NewsRouter,
    prefix="/api/news", 
    tags=['news'],
)

app.include_router(
    UsersRouter,
    prefix="/api/users",
    tags=['users']
)
