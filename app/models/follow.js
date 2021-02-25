/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-19 16:34:22
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 14:50:00
 */

const {
  sequelize
} = require('../../core/db')

const {
  DataTypes,
  Model
} = require('sequelize')

class Follow extends Model {}
Follow.init({
  to: DataTypes.INTEGER,
  to_nickname: DataTypes.STRING,
  to_avatar: DataTypes.STRING
}, {
  sequelize,
  tableName: 'Follow'
})

module.exports = {
  Follow
}