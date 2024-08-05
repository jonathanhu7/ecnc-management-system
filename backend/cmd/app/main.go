package main

import "github.com/gofiber/fiber/v2"

func main() {
	// 创建一个新的 Fiber 应用实例
	app := fiber.New()

	// 定义一个简单的路由
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	})

	// 启动 Fiber 应用并监听端口 3000
	app.Listen(":3000")
}
