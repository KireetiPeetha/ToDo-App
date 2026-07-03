from fastapi import APIRouter, Depends
from uuid import UUID
from schemas import CategoryCreate, CategoryResponse, CategoryUpdate
from category_controllers import create_category_controller
from category_controllers import get_all_categories_controller
from category_controllers import update_category_controller
from category_controllers import delete_category_controller
from auth_services import get_current_user_dependency

router = APIRouter(prefix="/categories", tags=["categories"])

@router.post("", response_model=CategoryResponse)
def create_category(category_data: CategoryCreate, current_user=Depends(get_current_user_dependency)):
    return create_category_controller(category_data, current_user)

@router.get("", response_model=list[CategoryResponse])
def get_all_categories(current_user=Depends(get_current_user_dependency)):
    return get_all_categories_controller(current_user)

@router.patch("/{category_id}", response_model=CategoryResponse)
def update_category(category_id: UUID, category_data: CategoryUpdate, current_user=Depends(get_current_user_dependency)):
    return update_category_controller(category_id, category_data, current_user)

@router.delete("/{category_id}")
def delete_category(category_id: UUID, current_user=Depends(get_current_user_dependency)):
    return delete_category_controller(category_id, current_user)