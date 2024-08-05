"""Change role field to privilege

Revision ID: b395e71ca9ff
Revises: 
Create Date: 2024-07-27 19:02:28.075042

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# 映射旧的字符串角色到新的整数权限
role_to_privilege = {"黑心": 3, "资深助理": 2, "普通助理": 1}

# revision identifiers, used by Alembic.
revision: str = "b395e71ca9ff"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 添加新字段 privilege
    op.add_column("users", sa.Column("privilege", sa.Integer(), nullable=True))

    # 更新旧的角色到新的权限值
    connection = op.get_bind()
    for role, privilege in role_to_privilege.items():
        connection.execute(
            sa.text("UPDATE users SET privilege = :privilege WHERE role = :role"),
            {"privilege": privilege, "role": role},
        )

    # 删除旧字段 role
    op.drop_column("users", "role")

    # 设置新字段 privilege 为非空
    op.alter_column("users", "privilege", nullable=False)


def downgrade() -> None:
    # 添加旧字段 role
    op.add_column("user", sa.Column("role", sa.String, nullable=True))

    # 更新新的权限值到旧的角色
    connection = op.get_bind()
    for role, privilege in role_to_privilege.items():
        connection.execute(
            sa.text("UPDATE users SET role = :role WHERE privilege = :privilege"),
            {"role": role, "privilege": privilege},
        )

    # 删除新字段 privilege
    op.drop_column("users", "privilege")

    # 设置新字段 role 为非空
    op.alter_column("users", "role", nullable=False)
