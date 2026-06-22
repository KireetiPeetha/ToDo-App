from schemas import ToDoCreate
from services import create_todo_service


def create_todo_controller(todo_data: ToDoCreate):
    return create_todo_service(todo_data)