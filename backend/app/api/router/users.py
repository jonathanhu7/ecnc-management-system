from fastapi import APIRouter, status, HTTPException

from app.core.database import db_dependency
from app.models import Users
from app.schema import CreateUserRequest
from app.core.security import hash_password, user_dependency

router = APIRouter(tags=["user"])


# API: 新建用户
@router.post("/user/create_user", status_code=status.HTTP_201_CREATED)
async def create_user(
    user_request: CreateUserRequest, db: db_dependency, current_user: user_dependency
):
    if current_user is None or current_user.privilege < 3:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="无权访问")

    new_user = Users(
        username=user_request.username,
        hashed_password=hash_password(user_request.password),
        name=user_request.name,
        privilege=user_request.privilege,
    )

    # 查找一下有没有相同 netid 的用户，如果有，则应该创建失败
    existing_user = db.query(Users).filter(Users.username == new_user.username).first()

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="该 NetID 已存在"
        )

    db.add(new_user)
    db.commit()
