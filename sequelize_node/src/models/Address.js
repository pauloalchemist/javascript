const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
        neighborhood: DataTypes.STRING,
        zicode: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Address;
