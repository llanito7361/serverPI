const {DataType, DataTypes, UUIDV4} = require('sequelize')

module.exports = ( sequelize)=>
sequelize.define('Platform', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0,50]
        }
    }
    // , created: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true,
    //     defaultValue: true,
    // }
},
    {timestamps: false}
)