import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp_code: {
        type: DataTypes.STRING(6),
        allowNull: true,
    },
    otp_expires: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'Register',
    timestamps: false,
});

export default User;
