const {
  sequelize
} = require('../../core/db')
const {
  DataTypes,
  Model
} = require('sequelize')
const {
  Comment
} = require('./comment')

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
  howLongAgo: DataTypes.STRING
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

Article.hasMany(Comment,{
  foreignKey: 'arId',
  as: 'Comments',
  sourceKey: 'id'
})

Comment.belongsTo(Article, {
  as: 'Article',
  foreignKey: 'arId',
  targetKey: 'id'
})

module.exports = {
  Article
}