const Sequelize = require('sequelize');

const asString = (minChar = 0, maxChar = 255, allowNull = true, fieldName='') => {
  console.log({
    minChar,
    maxChar,
    allowNull, fieldName
  });

  return {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [minChar, maxChar],
        msg: `${fieldName} length must be between ${minChar} and ${maxChar}`
      }
    },
    allowNull: allowNull
  }
}

const asBoolean = (defaultValue = false) => {
  return {
    type: Sequelize.BOOLEAN,
    defaultValue: defaultValue
  }
}

const asNonNegativeInt = (allowNull = true) => {
  return {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: allowNull
  }
}

const asNonNegativeFloat = (allowNull = true) => {
  return {
    type: Sequelize.FLOAT.UNSIGNED,
    allowNull: allowNull
  }
}

const asOneOf = (defaultValue, ...options) => {
  return {
    type: Sequelize.ENUM(...options),
    defaultValue: defaultValue
  }
}

module.exports = { asString, asBoolean, asNonNegativeInt, asNonNegativeFloat, asOneOf }

