from schemas import ToDoCreate, ToDoUpdate
from uuid import UUID
from services import create_todo_service
from services import get_all_todos_service
from services import get_todo_service
from services import update_todo_service
from services import delete_todo_service


def create_todo_controller(todo_data: ToDoCreate, current_user):
    return create_todo_service(todo_data, current_user)

def get_all_todos_controller(current_user):
    return get_all_todos_service(current_user)

def get_todo_controller(todo_id: UUID, current_user):
    return get_todo_service(todo_id, current_user)

def update_todo_controller(todo_id: UUID, todo_data: ToDoUpdate, current_user):
    return update_todo_service(todo_id, todo_data, current_user)

def delete_todo_controller(todo_id: UUID, current_user):
    return delete_todo_service(todo_id, current_user)