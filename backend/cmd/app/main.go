package main

import (
	"backend/config"
	"backend/internal/repository"
	"backend/internal/router"
	"backend/internal/service"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// 创建一个新的 Fiber 应用实例
	app := fiber.New()

	// 加载环境变量
	config.LoadEnv()

	// 初始化数据库
	repository.InitDB()

	// 初始化超级用户（仅在用户表为空时初始化）
	service.InitSuperUser()

	// 设置路由
	router.SetupRoutes(app)

	// 启动 Fiber 应用并监听端口 3000
	app.Listen(":3000")
}
