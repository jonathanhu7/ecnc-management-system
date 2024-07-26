from pydantic import (
    BaseModel,
)  # 继承 pydantic 的 BaseModel 模型能够让 FastAPI 自动生成 API 文档


# 定义 token 类型
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict
    expires_in: int


class UserBase(BaseModel):
    username: str
    name: str
    role: str


class UserResponse(UserBase):
    pass


# 定义创建用户的请求体
class CreateUserRequest(UserBase):
    password: str
