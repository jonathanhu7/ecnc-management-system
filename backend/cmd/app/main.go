package main

import (
	"backend/config"
	"backend/internal/repository"
	"backend/internal/router"
	"backend/internal/service"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	// 启用 CROS 中间件以处理跨域问题
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	// 设置路由
	router.SetupRoutes(app)

	// 找到可用的端口并启动 fiber 应用
	var port int

	for port = 3000; port <= 65535; port++ {
		app.Listen(fmt.Sprintf(":%d", port))
	}

	if port > 65535 {
		// 如果全部端口都被占用，那么就记录错误并退出
		log.Fatal("在 3000 到 65535 端口开启 fiber 应用均发生错误，请检查端口情况")
	}
}
