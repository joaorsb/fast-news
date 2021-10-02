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
    async with AsyncClient(app=app1, base_url="http://127.0.0.1:8000") as client:
        yield client

@pytest.mark.asyncio
async def test_home(client):
    response = await client.get("/api/users")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_add_with_error(client):
    new_user = '{"name":"John Doe","email":"joed@example.com"}'
    response = await client.put("/api/users/add/", data=new_user)
    assert response.status_code == 400
    assert response.text == '{"detail":"User with email joed@example.com already exists"}'

@pytest.mark.asyncio
async def test_get_user_by_email(client):
    email = "joed@example.com"
    response = await client.get(f"/api/users/user/{email}")
    assert response.status_code == 200
    