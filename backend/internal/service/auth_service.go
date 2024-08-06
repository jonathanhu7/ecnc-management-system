package service

import (
	"backend/config"
	"backend/internal/model"
	"backend/internal/repository"
	"log"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

// AuthError 表示认证错误相关的错误
type AuthError struct {
	Message string
}

// Error 方法的接受者是 *AuthError
// 该方法返回 AuthError 类型的变量的 Message 字段
// 实现了 Error 方法可以使得 *AuthError 实现了 error 接口
func (e *AuthError) Error() string {
	return e.Message
}

func Authenticate(username, password string) (*model.User, string, error) {
	// 通过用户名获取用户
	user, err := repository.GetUserByUsername(username)

	if err != nil {
		// 即使此时我们能够判断出用户不存在，也不应该返回这个信息，因为这样会给攻击者提供一个检测用户名是否存在的接口
		log.Printf("登陆验证: 获取用户名为 %s 的用户失败，该用户不存在", username)
		return nil, "", &AuthError{Message: "用户名或密码错误"}
	}

	// 检查密码是否正确
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		log.Printf("登陆验证: 用户名为 %s 的用户密码错误", username)
		return nil, "", &AuthError{Message: "用户名或密码错误"}
	}

	// 创建 JWT
	token, err := createJWT(user)

	if err != nil {
		log.Printf("登陆验证: 创建 JWT 失败，错误为 %v", err)
		return nil, "", err
	}

	// 返回用户信息和 token
	log.Printf("登陆验证: 用户名为 %s 的用户登陆成功", username)
	return user, token, nil
}

// 创建 JWT
func createJWT(user *model.User) (string, error) {
	// 获取 .env 中的 SECRET 环境变量
	secret := config.Config("SECRET")

	// 创建 JWT 声明
	claims := jwt.MapClaims{
		"username": user.Username,
		"name":     user.Name,
		"priority": user.Priority,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token 在 24 小时后过期
	}

	// 创建 token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 返回 token
	return token.SignedString([]byte(secret))
}
