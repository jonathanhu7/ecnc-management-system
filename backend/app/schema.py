from pydantic import (
    BaseModel,
)  # 继承 pydantic 的 BaseModel 模型能够让 FastAPI 自动生成 API 文档


# 定义 token 类型
class Token(BaseModel):
    access_token: str
    token_type: str
