package model

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"uniqueIndex" json:"username"`
	Name     string `gorm:"not null" json:"name"`
	Password string `gorm:"not null" json:"password"`
	Priority uint   `gorm:"not null" json:"priority"` // Priority 是权限等级，普通助理的权限等级为 1，资深助理的权限等级为 2，黑心的权限等级为 3
}
