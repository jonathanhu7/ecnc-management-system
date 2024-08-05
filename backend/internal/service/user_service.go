package service

import (
	"backend/internal/model"

	"golang.org/x/crypto/bcrypt"
)

// 创建用户
func CreateUser(user *model.User) error {
	hashedPassword, err := hashPassword(user.HashedPassword)
}

// 对密码进行哈希
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
