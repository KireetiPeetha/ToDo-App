from database import SessionLocal
from uuid import UUID
from models import ToDo
from schemas import ToDoCreate
from fastapi import HTTPException

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


def get_all_todos_service():
    db = SessionLocal()
    try:
        todos = db.query(ToDo).all()
        return todos
    finally:
        db.close()


def get_todo_service(todo_id: UUID):
    db = SessionLocal()
    try:
        todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
        if todo:
            return todo
        else:
            raise HTTPException(status_code = 404, detail = "ToDo not found")
    finally:
        db.close()