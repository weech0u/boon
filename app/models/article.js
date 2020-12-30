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
  arId: DataTypes.STRING,
  title: DataTypes.STRING(30),
  author: DataTypes.STRING(12),
  niceCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tags: DataTypes.STRING,
  content: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Article',
  freezeTableName: true,
  created: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timestamps: true
})

module.exports = {
  Article
}