from schemas import ToDoCreate, ToDoUpdate
from uuid import UUID
from services import create_todo_service
from services import get_all_todos_service
from services import get_todo_service
from services import update_todo_service


def create_todo_controller(todo_data: ToDoCreate):
    return create_todo_service(todo_data)

def get_all_todos_controller():
    return get_all_todos_service()

def get_todo_controller(todo_id: UUID):
    return get_todo_service(todo_id)

def update_todo_controller(todo_id: UUID, todo_data: ToDoUpdate):
    return update_todo_service(todo_id, todo_data)