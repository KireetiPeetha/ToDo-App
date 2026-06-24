from fastapi import APIRouter
from controllers import create_todo_controller
from controllers import get_all_todos_controller
from schemas import ToDoCreate, ToDoResponse


router = APIRouter()

@router.post("/todos", response_model=ToDoResponse)
def create_todo(todo_data: ToDoCreate):
    return create_todo_controller(todo_data)

@router.get("/get_all_todos", response_model = list[ToDoResponse])
def get_all_todos():
    return get_all_todos_controller()
