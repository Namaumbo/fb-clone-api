const connection = require("../connection");
const DataTypes = require("sequelize");

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;
const User = connection.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
        isEmail: true,
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
    },
    following: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 8,
        max: 15,
      },
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        validator: function (v) {
          return phoneValidationRegex.test(v);
        },
      },
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:true,
      validate:{
        min:3,
        max:255
      }
    },
    city:{
      type:DataTypes.STRING,
      validate:{
        min:3,
        max:255
      }
    },
    onLineStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    careers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = User;
