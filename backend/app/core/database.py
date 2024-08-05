from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import settings


# 获取数据库 URL
SQLALCHEMY_DATABASE_URL = str(settings.SQLALCHEMY_DATABASE_URI)


# 创建数据库引擎
engine = create_engine(SQLALCHEMY_DATABASE_URL)


# 创建 session 绑定上述引擎以和数据库交互
# 这里的 SessionLocal 是一个函数，当你要操作数据库的时候在用它来产生一个 session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# 用于连接数据库的函数
# 作为依赖通过 Depends() 注入到 API 中
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


# 申明 ORM 基类以定义模型
Base = declarative_base()
