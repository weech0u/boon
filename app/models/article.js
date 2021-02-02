/*
 * @Author: zhou wei
 * @Date: 2020-11-05 15:45:44
 * @LastEditTime: 2021-02-01 11:34:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /boon/app/models/article.js
 */
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
const {
  Love
} = require('./love')

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
  commentsCount: {
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

// 外键: 文章->评论 (一对多)
Article.hasMany(Comment, {
  foreignKey: 'arId',
  as: 'Comments',
  sourceKey: 'id'
})

Comment.belongsTo(Article, {
  as: 'Article',
  foreignKey: 'arId',
  targetKey: 'id'
})

// 外键: 文章->点赞表 (一对多)
Article.hasMany(Love, {
  foreignKey: 'arId',
  as: 'Love',
  sourceKey: 'id'
})

Love.belongsTo(Article, {
  as: 'Article',
  foreignKey: 'arId',
  sourceKey: 'id'
})

module.exports = {
  Article
}