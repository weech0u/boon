const bcrypt = require('bcryptjs')
const {
  HttpException
} = require('../../core/http-exception')

const {
  sequelize
} = require('../../core/db')

const {
  Sequelize,
  Model,
  NUMBER
} = require('sequelize')
const {
  STRING,
  INTEGER
} = Sequelize

class User extends Model {
  static async verifyEmailPassword(account, plainPassword) {
    const user = await User.findOne({
      where: {
        nickname: account
      }
    })
    if (!user) {
      throw new HttpException('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new HttpException('密码不正确')
    }
    return user
  }
}

User.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: STRING,
    unique: true
  },
  email: STRING,
  password: {
    type: STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  key: {
    type: STRING(64)
  },
  level: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'user'
})

// 数据迁移 SQL 更新 风险

module.exports = {
  User
}