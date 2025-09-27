import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Discount = sequelize.define('Discount', {
    Sito: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    Sconto: {
        type:DataTypes.STRING,
        allowNull: false
    },
    dataCreazione: {
        type: DataTypes.DATE,
        allowNull:false
    },
    dataScadenza: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Discounts',
    timestamps: false,
});


export default Discount;
