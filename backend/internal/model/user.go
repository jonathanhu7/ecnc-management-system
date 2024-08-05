package model

type User struct {
	ID             uint   `gorm:"primaryKey"`
	Username       string `gorm:"uniqueIndex"`
	HashedPassword string
	Priority       uint // Priority 是权限等级，普通助理的权限等级为 1，资深助理的权限等级为 2，黑心的权限等级为 3
}
