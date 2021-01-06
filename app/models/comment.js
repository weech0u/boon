const Router = require('koa-router')
const {
  sequelize
} = require('../../core/db')
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize')

class Comment extends Model {}

// 回复人头像, 回复人昵称, 被回复人头像, 被回复人昵称 在"添加评论"时添加
Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  from_avatar: DataTypes.STRING,
  from_nickname: DataTypes.STRING,
  from_uid: DataTypes.INTEGER,
  to_avatar: DataTypes.STRING,
  to_nickname: DataTypes.STRING,
  to_uid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  content: DataTypes.STRING(1000),
  niceCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'Comments',
  created: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timestamps: true
})

module.exports = {Comment}