import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Sneaker = sequelize.define('Sneaker', {
    imageUrl: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
    modello: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataAcquisto: {
        type: DataTypes.DATE,
        allowNull: false
    },
    prezzoAcquisto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataVendita: {
        type: DataTypes.DATE,
        allowNull: true
    },
    prezzoVendita: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'sneakers',
    timestamps: false,
});



export default Sneaker;
