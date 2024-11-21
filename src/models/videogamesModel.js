const { DataType, DataTypes, UUIDV4, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')

module.exports = (sequelize) => {
  sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return sequelize.define('Videogame', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: sequelize.literal('uuid_generate_v4()'), 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 50]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    }
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 15]
    }
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 15]
    }
  },
  created: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
  { timestamps: false }
);
}