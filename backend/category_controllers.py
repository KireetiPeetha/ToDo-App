from uuid import UUID
from schemas import CategoryCreate, CategoryUpdate
from category_services import create_category_service
from category_services import get_all_categories_service
from category_services import update_category_service
from category_services import delete_category_service

def create_category_controller(category_data: CategoryCreate, current_user):
    return create_category_service(category_data, current_user)

def get_all_categories_controller(current_user):
    return get_all_categories_service(current_user)

def update_category_controller(category_id: UUID, category_data: CategoryUpdate, current_user):
    return update_category_service(category_id, category_data, current_user)

def delete_category_controller(category_id: UUID, current_user):
    return delete_category_service(category_id, current_user)