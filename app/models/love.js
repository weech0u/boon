const {
  sequelize
} = require('../../core/db')
const {
  DataTypes,
  Model
} = require('sequelize')

class Love extends Model {}

Love.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cid: DataTypes.STRING,
  uid: DataTypes.INTEGER,
  status: {
    type: DataTypes.INTEGER(0,1),
    defaultValue: 0
  }
},{
  sequelize,
  modelName: 'Love',
  freezeTableName: true,
  created: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timestamps: true
})

module.exports = {
  Love
}