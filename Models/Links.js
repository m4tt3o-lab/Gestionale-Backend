import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Link = sequelize.define('Link', {
    Url: {
        type: DataTypes.STRING, 
        allowNull: false,
      }
}, {
    tableName: 'links',
    timestamps: true,
});


export default Link;
