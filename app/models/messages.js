/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-23 16:44:33
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 14:50:21
 */
const {
  sequelize
} = require('../../core/db')
const {
  DataTypes,
  Model
} = require('sequelize')

class Messages extends Model {}

Messages.init({
  sender_uid: DataTypes.STRING,
  receiver_uid: DataTypes.STRING,
  receiver_type: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  content: DataTypes.STRING,
  timestamp: DataTypes.INTEGER
}, {
  sequelize,
})

module.exports = {
  Messages
}