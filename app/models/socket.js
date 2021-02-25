/*
 * @Description:  
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-22 16:13:15
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-23 14:20:49
 */
const {
  sequelize
} = require('../../core/db')

const {
  DataTypes,
  Model
} = require('sequelize')

class Socket extends Model {}

Socket.create({

})

module.exports = {
  Socket
}