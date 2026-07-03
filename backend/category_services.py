from database import SessionLocal
from uuid import UUID
from models import Category
from schemas import CategoryCreate, CategoryUpdate
from fastapi import HTTPException

def create_category_service(category_data: CategoryCreate, current_user):
    db = SessionLocal()
    try:
        new_category = Category(
            name=category_data.name,
            color=category_data.color,
            user_id=current_user.id
        )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        return new_category
    finally:
        db.close()

def get_all_categories_service(current_user):
    db = SessionLocal()
    try:
        return db.query(Category).filter(Category.user_id == current_user.id).all()
    finally:
        db.close()

def update_category_service(category_id: UUID, category_data: CategoryUpdate, current_user):
    db = SessionLocal()
    try:
        category = db.query(Category).filter(
            Category.id == category_id,
            Category.user_id == current_user.id
        ).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        if category_data.name is not None:
            category.name = category_data.name
        if category_data.color is not None:
            category.color = category_data.color
        db.commit()
        db.refresh(category)
        return category
    finally:
        db.close()

def delete_category_service(category_id: UUID, current_user):
    db = SessionLocal()
    try:
        category = db.query(Category).filter(
            Category.id == category_id,
            Category.user_id == current_user.id
        ).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        db.delete(category)
        db.commit()
        return {"message": "Category deleted successfully"}
    finally:
        db.close()