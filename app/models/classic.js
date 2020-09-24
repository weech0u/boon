// 连接数据库
const sequelize = require('../../core/db')
// ORM
const { Sequelize, Model } = require('sequelize')

// 通用部分
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

// --Movie--
class Movie extends Model {}

Movie.init(classicFields,{
  sequelize,
  tableName: 'movie'
})

// --Music--
class Music extends Model {}

Music.init(classicFields,{
  sequelize,
  tableName: 'music'
})