from fastapi import APIRouter
from schemas import UserRegister, UserLogin
from auth_services import register_user, login_user, refresh_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user_data: UserRegister):
    return register_user(user_data)

@router.post("/login")
def login(user_data: UserLogin):
    return login_user(user_data)

@router.post("/refresh")
def refresh(refresh_token: str):
    return refresh_access_token(refresh_token)