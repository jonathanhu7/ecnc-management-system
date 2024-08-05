package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"log"
	"math/rand"

	"golang.org/x/crypto/bcrypt"
)

// 创建用户
func CreateUser(user *model.User) error {
	// 获取用户密码并进行哈希
	hashedPassword, err := hashPassword(user.Password)

	if err != nil {
		return err
	}

	// 将哈希后的密码赋值给用户
	user.Password = hashedPassword

	// 调用 repository 中的函数创建用户
	return repository.CreateUser(user)
}

// 对密码进行哈希
func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

// 创建超级用户（仅在用户表为空时被调用）
func CreateSuperUser() error {
	password := generateRandomPassword(12)

	user := model.User{
		Username: "admin",
		Name:     "管理员",
		Password: password,
		Priority: 3,
	}

	if err := repository.CreateUser(&user); err != nil {
		return err
	}

	log.Printf("检测到用户数据表为空，故初始化第一个超级用户，该超级用户的信息仅会显示一次。\n")
	log.Printf("\t用户名: %s\n", user.Username)
	log.Printf("\t姓名: %s\n", user.Name)
	log.Printf("\t密码: %s\n", user.Password)
	log.Printf("\t权限等级: %d\n", user.Priority)

	return nil
}

// 生成随机密码
func generateRandomPassword(length int) string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

// 如果用户表为空，则会创建一个超级用户
func InitSuperUser() {
	count, err := repository.CountUsers()

	if err != nil {
		log.Fatalf("检测用户表是否为空时发生了错误: %v", err)
	}

	if count == 0 {
		if err := CreateSuperUser(); err != nil {
			log.Fatalf("检测到用户表为空，创建第一个超级用户时发生错误: %v", err)
		}
	}
}
