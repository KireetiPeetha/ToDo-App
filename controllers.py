from schemas import ToDoCreate
from services import create_todo_service
from services import get_all_todos_service


def create_todo_controller(todo_data: ToDoCreate):
    return create_todo_service(todo_data)

def get_all_todos_controller():
    return get_all_todos_service()