from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import computed_field, PostgresDsn
from pydantic_core import MultiHostUrl


# 配置
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env")  # 指定环境变量文件的位置

    # token
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 一个小时
    HASH_ALGORITH: str = "HS256"

    # 数据库
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    @computed_field  # 用于标记计算属性，表示这个字段是通过计算得到的
    @property  # 将一个方法转换为属性
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        # PostgresDsn 是 Pydantic 中用于处理 PostgreSQL 数据库连接字符串的一种数据类型
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )


settings = Settings()
