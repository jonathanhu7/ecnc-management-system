package handler

import (
	"backend/internal/service"

	"github.com/gofiber/fiber/v2"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// 登录
func Login(c *fiber.Ctx) error {
	// 解析请求体
	req := new(LoginRequest)

	if err := c.BodyParser(req); err != nil {
		return responseWithBadRequestError(c)
	}

	// 验证用户名和密码
	user, token, err := service.Authenticate(req.Username, req.Password)

	if err != nil {
		// 判断 err 是否为 AuthError 类型，如果是，则返回未授权错误
		// err.(*service.AuthError) 是一个类型断言，表示将 err 转换为 *service.AuthError 类型
		if authErr, ok := err.(*service.AuthError); ok {
			return responseWithUnauthorizedError(c, authErr.Message)
		}

		// 否则返回服务器内部错误
		return responseWithInternalServerError(c)
	}

	// 创建 UserResponse 实例，使其不包含密码字段
	UserResponse := UserResponse{
		Username: user.Username,
		Name:     user.Name,
		Priority: user.Priority,
	}

	// 返回成功响应
	return responseWithSuccessOK(c, "登录成功", fiber.Map{"token": token, "user": UserResponse})
}
