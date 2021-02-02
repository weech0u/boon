/*
 * @Author: zhou wei
 * @Date: 2021-02-01 11:01:56
 * @LastEditTime: 2021-02-01 11:32:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /boon/app/models/noti.js
 */
const {
  sequelize
} = require('../../core/db')
const {
  DataTypes,
  Model
} = require('sequelize')
const {
  User
} = require('./user')

// 格式 following 更新了新文章 xxx
class Notification extends Model {}
Notification.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  options: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Notifications',
  created: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timestamps: true
})

module.exports = {
  Notification
}