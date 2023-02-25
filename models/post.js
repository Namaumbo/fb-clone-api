"use strict";
const { Model } = require("sequelize");
const connection = require("../connection");
const DataTypes = require('sequelize')
const Post = connection.define(
  "Post",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
        max: 30,
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        min: 3,
        max: 255,
      },
    },
    author: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue:0

    },
    featuredImage: {
      type: DataTypes.STRING,

    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = Post