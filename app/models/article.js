const {
  sequelize
} = require('../../core/db')
const {
  DataTypes,
  Model
} = require('sequelize')

class Article extends Model {}

Article.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  arId: DataTypes.INTEGER,
  title: DataTypes.STRING(30),
  author: DataTypes.STRING(12),
  niceCount: DataTypes.INTEGER,
  content: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Article',
  freezeTableName: true
})

Article.sync()

module.exports = {
  Article
}