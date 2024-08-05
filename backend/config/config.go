package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// 加载 .env 文件
func LoadEnv() {
	// 加载 .env 文件
	err := godotenv.Load(".env")

	// 如果加载 .env 的过程发生了错误，则打印错误信息
	if err != nil {
		log.Fatalf("加载 .env 文件时发生了错误: %v", err)
	}
}

// Config 函数的作用是根据获取 key 对应的环境变量
// key 可能为 "DB_USER", "DB_HOST" 等等
func Config(key string) string {
	// 返回 key 值对应的环境变量，如果该环境变量没有设置，那么就报错并终止程序
	value := os.Getenv(key)

	if value == "" {
		log.Fatalf("环境变量 %s 没有设置", key)
	}

	return value
}
