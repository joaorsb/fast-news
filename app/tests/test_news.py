import pytest
from httpx import AsyncClient
from asgi_lifespan import LifespanManager

from ..main import app

@pytest.fixture
async def app1():
    async with LifespanManager(app):
        yield 

@pytest.fixture
async def client(app1):
    async with AsyncClient(app=app1, base_url="http://127.0.0.1:8000/api/news") as client:
        yield client

@pytest.mark.asyncio
async def test_home(client):
    response = await client.get("/")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_news_by_title(client):
    title = "breaking"
    response = await client.get(f"/title/{title}/")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_get_news_by_author(client):
    name = "Jane%20Doe"
    response = await client.get(f"/author/{name}/")
    assert response.status_code == 200