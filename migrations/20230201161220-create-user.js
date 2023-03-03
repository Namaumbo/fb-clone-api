"use strict";
/** @type {import('sequelize-cli').Migration} */

const DataTypes = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
       
        
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      
      },
      userName:{
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
       
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
        default:[]
      } ,
      following: { 
        type: DataTypes.ARRAY(DataTypes.UUID),
        default:[]
      },
      city:{
        type:DataTypes.STRING
      },
      description:{
        type:DataTypes.TEXT
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onLineStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      careers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
