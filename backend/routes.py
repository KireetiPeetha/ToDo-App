from fastapi import APIRouter, Depends
from uuid import UUID
from controllers import create_todo_controller
from controllers import get_all_todos_controller
from controllers import get_todo_controller
from controllers import update_todo_controller
from controllers import delete_todo_controller
from schemas import ToDoCreate, ToDoResponse, ToDoUpdate
from auth_services import get_current_user_dependency

router = APIRouter()

@router.post("/todos", response_model=ToDoResponse)
def create_todo(todo_data: ToDoCreate, current_user=Depends(get_current_user_dependency)):
    return create_todo_controller(todo_data, current_user)

@router.get("/get_all_todos", response_model=list[ToDoResponse])
def get_all_todos(current_user=Depends(get_current_user_dependency)):
    return get_all_todos_controller(current_user)

@router.get("/get_todo/{todo_id}", response_model=ToDoResponse)
def get_todo(todo_id: UUID, current_user=Depends(get_current_user_dependency)):
    return get_todo_controller(todo_id, current_user)

@router.patch("/update_todo/{todo_id}", response_model=ToDoResponse)
def update_todo(todo_id: UUID, todo_data: ToDoUpdate, current_user=Depends(get_current_user_dependency)):
    return update_todo_controller(todo_id, todo_data, current_user)

@router.delete("/delete_todo/{todo_id}")
def delete_todo(todo_id: UUID, current_user=Depends(get_current_user_dependency)):
    return delete_todo_controller(todo_id, current_user)
