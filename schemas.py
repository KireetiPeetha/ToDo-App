from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID

class ToDoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class ToDoResponse(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool
    id: UUID
    model_config = ConfigDict(from_attributes=True)
 