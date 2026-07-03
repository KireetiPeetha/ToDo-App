from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime, date, time
from models import PriorityEnum, RepeatEnum

class ToDoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    priority: Optional[PriorityEnum] = None
    repeat: Optional[RepeatEnum] = None
    reminder: Optional[bool] = False
    is_important: Optional[bool] = False
    category_id: Optional[UUID] = None

class ToDoResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    completed: bool
    is_important: bool
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    priority: Optional[PriorityEnum] = None
    repeat: Optional[RepeatEnum] = None
    reminder: bool
    user_id: UUID
    category_id: Optional[UUID] = None
    model_config = ConfigDict(from_attributes=True)

class ToDoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    is_important: Optional[bool] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    priority: Optional[PriorityEnum] = None
    repeat: Optional[RepeatEnum] = None
    reminder: Optional[bool] = None
    category_id: Optional[UUID] = None

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str
 