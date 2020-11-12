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
    timestamps: false,
    paranoid: true
  }
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync({
  force: false,
  alter: true
}).then(() => {
  console.log("Drop and re-sync db.");
})

module.exports = {
  sequelize
}