from fastapi import APIRouter
from uuid import UUID
from controllers import create_todo_controller
from controllers import get_all_todos_controller
from controllers import get_todo_controller
from controllers import update_todo_controller
from controllers import delete_todo_controller
from schemas import ToDoCreate, ToDoResponse, ToDoUpdate


router = APIRouter()

@router.post("/todos", response_model=ToDoResponse)
def create_todo(todo_data: ToDoCreate):
    return create_todo_controller(todo_data)

@router.get("/get_all_todos", response_model = list[ToDoResponse])
def get_all_todos():
    return get_all_todos_controller()

@router.get("/get_todo/{todo_id}", response_model = ToDoResponse)
def get_todo(todo_id: UUID):
    return get_todo_controller(todo_id)

@router.patch("/update_todo/{todo_id}", response_model = ToDoResponse)
def update_todo(todo_id: UUID, todo_data: ToDoUpdate):
    return update_todo_controller(todo_id, todo_data)

@router.delete("/delete_todo/{todo_id}")
def delete_todo(todo_id: UUID):
    return delete_todo_controller(todo_id)
