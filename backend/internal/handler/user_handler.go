package handler

import (
	"backend/internal/model"

	"github.com/gofiber/fiber/v2"
)

// 创建用户
func CreateUser(c *fiber.Ctx) error {
	// 创建一个新的 User 结构体实例，并将其指针赋值给 user 变量
	user := new(model.User)

	// 将请求体解析为 user 结构体
	// 如果解析失败，则返回错误信息
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "无法解析请求体"})
	}
}
