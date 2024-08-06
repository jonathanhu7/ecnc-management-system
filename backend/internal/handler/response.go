package handler

import "github.com/gofiber/fiber/v2"

type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Name     string `json:"name"`
	Priority uint   `json:"priority"`
}

// Bad Request 通常出现在无法解析请求体的情况
// "status": "fail" 表示是客户端错误
func responseWithBadRequestError(c *fiber.Ctx) error {
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "无法解析请求体", "data": nil})
}

// 服务器内部错误
// "status": "error" 表示是服务端错误
func responseWithInternalServerError(c *fiber.Ctx) error {
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "服务器内部错误", "data": nil})
}

// 未授权错误，通常出现在用户名或密码错误，权限等级不够的情况
func responseWithUnauthorizedError(c *fiber.Ctx, message string) error {
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "fail", "message": message, "data": nil})
}

// 成功创建
func responseWithSuccessCreated(c *fiber.Ctx, message string, data interface{}) error {
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "message": message, "data": data})
}

// 成功响应
func responseWithSuccessOK(c *fiber.Ctx, message string, data interface{}) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": message, "data": data})
}
