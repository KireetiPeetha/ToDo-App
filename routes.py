from fastapi import APIRouter
from controllers import create_todo_controller
from schemas import ToDoCreate, ToDoResponse


router = APIRouter()

@router.post("/todos", response_model=ToDoResponse)
def create_todo(todo_data: ToDoCreate):
    return create_todo_controller(todo_data)