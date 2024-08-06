package router

import (
	"backend/internal/handler"

	"github.com/gofiber/fiber/v2"
)

// 设置路由
func SetupRoutes(app *fiber.App) {
	user := app.Group("/user")

	user.Post("/", handler.CreateUser)

	auth := app.Group("/auth")

	auth.Post("/login", handler.Login)
}
