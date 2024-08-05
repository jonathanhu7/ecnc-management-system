from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    privilege = Column(Integer, nullable=False)
