const {sequelize} = require('../../core/db')
const { Sequelize, Model, DataTypes } = require('sequelize')

class Article extends Model {}

Article.init({
  arId: DataTypes.INTEGER,
  title: DataTypes.STRING(30),
  author: DataTypes.STRING(12),
  niceCount: DataTypes.INTEGER,
  content: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Article'
})

Article.sync({
  alter: true
})

module.exports = {Article}