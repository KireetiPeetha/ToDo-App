from database import SessionLocal
from uuid import UUID
from models import ToDo
from schemas import ToDoCreate, ToDoUpdate
from fastapi import HTTPException

def create_todo_service(todo_data: ToDoCreate, current_user):
    db = SessionLocal()
    try:
        new_todo = ToDo(
            title=todo_data.title,
            description=todo_data.description,
            due_date=todo_data.due_date,
            due_time=todo_data.due_time,
            priority=todo_data.priority,
            repeat=todo_data.repeat,
            reminder=todo_data.reminder,
            is_important=todo_data.is_important,
            category_id=todo_data.category_id,
            user_id=current_user.id
        )
        db.add(new_todo)
        db.commit()
        db.refresh(new_todo)
        return new_todo
    finally:
        db.close()

def get_all_todos_service(current_user):
    db = SessionLocal()
    try:
        todos = db.query(ToDo).filter(ToDo.user_id == current_user.id).all()
        return todos
    finally:
        db.close()

def get_todo_service(todo_id: UUID, current_user):
    db = SessionLocal()
    try:
        todo = db.query(ToDo).filter(ToDo.id == todo_id, ToDo.user_id == current_user.id).first()
        if todo:
            return todo
        else:
            raise HTTPException(status_code=404, detail="ToDo not found")
    finally:
        db.close()

def update_todo_service(todo_id: UUID, todo_data: ToDoUpdate, current_user):
    db = SessionLocal()
    try:
        todo = db.query(ToDo).filter(ToDo.id == todo_id, ToDo.user_id == current_user.id).first()
        if todo:
            if todo_data.title is not None:
                todo.title = todo_data.title
            if todo_data.description is not None:
                todo.description = todo_data.description
            if todo_data.completed is not None:
                todo.completed = todo_data.completed
            if todo_data.is_important is not None:
                todo.is_important = todo_data.is_important
            if todo_data.due_date is not None:
                todo.due_date = todo_data.due_date
            if todo_data.due_time is not None:
                todo.due_time = todo_data.due_time
            if todo_data.priority is not None:
                todo.priority = todo_data.priority
            if todo_data.repeat is not None:
                todo.repeat = todo_data.repeat
            if todo_data.reminder is not None:
                todo.reminder = todo_data.reminder
            if todo_data.category_id is not None:
                todo.category_id = todo_data.category_id
            db.commit()
            db.refresh(todo)
            return todo
        else:
            raise HTTPException(status_code=404, detail="ToDo not found")
    finally:
        db.close()

def delete_todo_service(todo_id: UUID, current_user):
    db = SessionLocal()
    try:
        todo = db.query(ToDo).filter(ToDo.id == todo_id, ToDo.user_id == current_user.id).first()
        if todo:
            db.delete(todo)
            db.commit()
            return {"message": "ToDo deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="ToDo not found")
    finally:
        db.close()