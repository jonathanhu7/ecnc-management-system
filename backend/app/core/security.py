# 读取配置文件
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

from app.core.database import db_dependency
from app.core.config import settings
from app.models import Users


# 获取生成 token 所需的密钥和加密算法
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.HASH_ALGORITH


# bcrypt_context 用来处理密码哈希
#   schemes=["bcrypt"] 表示使用 bcrypt 作为密码的哈希算法
#   deprecated="auto" 表示自动处理过时的哈希算法
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# oauth2_bearer 用来用于处理 OAuth2 的授权
#   tokenUrl='auth/token' 指定获取 token 的 url
#   该 api 具体实现在 login_for_access_token 函数
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# 对密码进行哈希
def hash_password(password: str) -> str:
    return bcrypt_context.hash(password)


# 验证用户
def authenticate_user(netid: str, password: str, db: db_dependency) -> Users | None:
    user = db.query(Users).filter(Users.netid == netid).first()

    if not user:
        return None  # 用户不存在

    if not bcrypt_context.verify(password, user.hashed_password):
        return None  # 密码错误

    return user  # 验证成功


# 生成 token
def create_access_token(
    netid: str, name: str, role: str, expires_delta: timedelta
) -> str:
    encode = {"netid": netid, "name": name, "role": role}  # payload
    expires = datetime.now(timezone.utc) + expires_delta  # token 过期时间
    encode.update(
        {"expires": expires.isoformat()}
    )  # 将过期时间加入 payload，isoformat 函数能够将日期转换为字符串
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


# 获取当前用户信息
# get_current_user 类似于 get_db，都是作为依赖注入函数
# 其中输入的 token 会调用 oauth2_bearer 来获取，而 oauth2_bearer 会再调用 login_for_access_token 函数来获取 token
def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        netid: str = payload.get("netid")
        name: str = payload.get("name")
        role: str = payload.get("role")

        if netid is None or name is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="用户未登录"
            )

        return {"netid": netid, "name": name, "role": role}

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="无法解析 JWT"
        )


user_dependency = Annotated[dict, Depends(get_current_user)]
