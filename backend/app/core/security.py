# 读取配置文件
import toml
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from app.core.database import db_dependency
from app.models import Users

config = toml.load("config.toml")


# 获取生成 token 所需的密钥和加密算法
SECRET_KEY = config["token"]["secret"]
ALGORITHM = config["token"]["algorithm"]


# bcrypt_context 用来处理密码哈希
#   schemes=["bcrypt"] 表示使用 bcrypt 作为密码的哈希算法
#   deprecated="auto" 表示自动处理过时的哈希算法
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# oauth2_bearer 用来用于处理 OAuth2 的授权
#   tokenUrl='auth/token' 指定获取 token 的 url
#   该 api 具体实现在 login_for_access_token 函数
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


# 验证用户
def authenticate_user(username: str, password: str, db: db_dependency):
    user = db.query(Users).filter(Users.name == username).first()

    if not user:
        return None  # 用户不存在

    if not bcrypt_context.verify(password, user.hashed_password):
        return None  # 密码错误

    return user  # 验证成功


# 生成 token
def create_access_token(netid: str, name: str, role: str, expires_delta: timedelta):
    encode = {"netid": netid, "name": name, "role": role}  # payload
    expires = datetime.now(timezone.utc) + expires_delta  # token 过期时间
    encode.update({"expires": expires})  # 将过期时间加入 payload
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
