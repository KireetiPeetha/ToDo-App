from database import SessionLocal
from models import ToDo
from schemas import ToDoCreate

def create_todo_service(todo_data: ToDoCreate):
    db = SessionLocal()
    try:
        new_todo = ToDo(
            title = todo_data.title,
            description = todo_data.description
        )
        db.add(new_todo)
        db.commit()
        db.refresh(new_todo)
        return new_todo
    finally:
        db.close()