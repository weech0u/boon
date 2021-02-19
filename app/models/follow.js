/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-19 16:34:22
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-19 16:53:18
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
  from: DataTypes.INTEGER,
  to: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'Follow'
})

module.exports = {
  Follow
}