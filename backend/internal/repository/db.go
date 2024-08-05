package repository

import (
	"backend/config"
	"backend/internal/model"
	"fmt"
	"log"
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB // 声明一个全局变量 db，用来保存数据库连接实例

// 初始化数据库连接实例
func InitDB() {
	var err error

	// 单独解析 DB_PORT，确保其为整数
	portStr := config.Config("DB_PORT")
	port, err := strconv.ParseUint(portStr, 10, 32) // 将 portStr 转换为 10 进制下 32 位无符号整数 port

	if err != nil {
		log.Fatalf("将 DB_PORT 转换为数字时发生了错误: %v", err)
	}

	// 构建 dsn (Data Source Name, 数据库连接字符串)
	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s",
		config.Config("DB_HOST"),
		port,
		config.Config("DB_USER"),
		config.Config("DB_PASSWORD"),
		config.Config("DB_NAME"),
	)

	// 根据 dsn 打开数据库连接
	// &gorm.Config{} 表示创建一个 gorm.Config 的结构体实例，并返回其指针，传递一个空的结构体表示使用默认配置
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("无法连接至数据库: %v", err)
	}

	// 使用 GORM 自动迁移数据库中的表结构
	// 如果表结构不存在，GORM 将创建表；如果表结构已经存在但与模型不匹配，GORM 将更新表结构以匹配模型定义
	err = db.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatalf("迁移数据库的时候发生了错误: %v", err)
	}

	// 打印成功连接数据库的信息
	log.Println("成功连接到数据库，并且数据库架构已经成功迁移。")
}

// 返回数据库连接实例
func GetDB() *gorm.DB {
	return db
}
