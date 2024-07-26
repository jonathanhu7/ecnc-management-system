from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.database import db_dependency
from app.core.security import authenticate_user, create_access_token, user_dependency
from app.schema import TokenResponse, UserResponse

# 路由设置
router = APIRouter(prefix="/auth", tags=["auth"])


# API: 登录获取 token
@router.post("/login", response_model=TokenResponse)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
):
    # 如果验证成功，则会返回用户，否则返回 None
    user = authenticate_user(
        username=form_data.username, password=form_data.password, db=db
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名不存在或密码错误"
        )  # 验证失败

    # 生成 token
    token = create_access_token(
        user.username,
        user.name,
        user.role,
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"username": user.username, "name": user.name, "role": user.role},
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


# API: 获取当前用户信息
@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: user_dependency):
    return current_user
