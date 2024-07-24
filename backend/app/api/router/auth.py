# from datetime import datetime, timedelta, timezone
# import toml
# from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
# from typing import Annotated
# from fastapi import APIRouter, Depends, HTTPException, status
# from passlib.context import CryptContext
# from jose import jwt
# from app.core.database import db_dependency
# from app.models import Users
# from app.schema import Token
#
#
# # 路由设置
# router = APIRouter(prefix="/auth", tags=["auth"])
#
#
# # API: 登录获取 token
# @router.post("/token", response_model=Token)
# async def login_for_access_token(
#     form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
#     db: db_dependency,
# ):
#     # 如果验证成功，则会返回用户，否则返回 None
#     user = authenticate_user(form_data.username, form_data.password, db)
#
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)  # 验证失败
#
#     # 生成 token
#     token = create_access_token(user.netid, user.name, user.role, timedelta(minutes=20))
#
#     return {"access_token": token, "token_type": "bearer"}
