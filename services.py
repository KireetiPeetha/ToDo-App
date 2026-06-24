from database import SessionLocal
from uuid import UUID
from models import ToDo
from schemas import ToDoCreate, ToDoUpdate
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


def update_todo_service(todo_id: UUID, todo_data: ToDoUpdate):
    db = SessionLocal()
    try:
        todo = db.query(ToDo).filter(ToDo.id == todo_id).first()
        if todo:
            if todo_data.title is not None:
                todo.title = todo_data.title
            if todo_data.description is not None:
                todo.description = todo_data.description
            if todo_data.completed is not None:
                todo.completed = todo_data.completed
            db.commit()
            db.refresh(todo)
            return todo
        else:
            raise HTTPException(status_code = 404, detail = "ToDo not found")
    finally:
        db.close()