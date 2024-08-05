package repository

import "backend/internal/model"

// 创建用户
func CreateUser(user *model.User) error {
	if err := GetDB().Create(user).Error; err != nil {
		return err
	}

	return nil
}

// 通过用户名获取用户
func GetUserByUsername(username string) (*model.User, error) {
	var user model.User

	// 获取用户，如果获取失败则返回错误信息
	if err := GetDB().Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

// 统计用户数量
func CountUsers() (int64, error) {
	var count int64

	// GORM 会根据传入的变量类型来选择使用哪个模型
	// 如果传入的变量无法识别出应该使用哪个模型，如下面的 model，则需要显示地指定模型
	if err := GetDB().Model(&model.User{}).Count(&count).Error; err != nil {
		return -1, err
	}

	return count, nil
}
