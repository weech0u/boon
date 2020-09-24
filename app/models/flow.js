// 连接数据库
const { sequelize } = require('../../core/db')
// ORM
const { Sequelize, Model } = require('sequelize')

class Flow extends Model {}

Flow.init({
  index: Sequelize.INTEGER,
  status: Sequelize.STRING
},{
  sequelize,
  tableName: 'flow'
})

module.exports = {Flow}