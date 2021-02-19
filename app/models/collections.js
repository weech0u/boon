/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2021-02-08 11:43:10
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-19 16:41:00
 */
const {
  sequelize
} = require('../../core/db')

const {
  DataTypes,
  Model
} = require('sequelize')

class Collections extends Model {}

Collections.init({
  arId: DataTypes.INTEGER,
  state: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'Collections'
})

module.exports = {
  Collections
}