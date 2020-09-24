const Sequelize = require('sequelize')
const {
  name,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(name, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    // create_time update_time delete_time
    timestamps: true,
    paranoid: true
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}