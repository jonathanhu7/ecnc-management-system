from fastapi import FastAPI

from app.core.config import settings
from app.core.database import Base, engine
from app.api.router import auth

app = FastAPI()

# 在 models 中定义的模型都继承于 Base，这些模型的数据都会写入 metadata 中
# 以下代码会在数据库中创建模型对应的表，如果表已经存在则不会创建
Base.metadata.create_all(bind=engine)

# 添加路由
# app.include_router(auth.router)


@app.get("/")
def read_settings():
    return {"POSTGRES_PASSWORD": settings.POSTGRES_PASSWORD}
