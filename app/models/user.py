from odmantic import Model
from pydantic import EmailStr
from bson import ObjectId

class UsersModel(Model):
    name: str
    email: EmailStr

    class Config:
        collection = 'users'
        json_encoders = {ObjectId: str}
        
        schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
            }
        }