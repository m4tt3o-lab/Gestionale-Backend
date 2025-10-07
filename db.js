import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: true,
});

sequelize.authenticate()
  .then(() => console.log('Connesso al database posgre'))
  .catch(err => console.error('Impossibile connettersi:', err));

export default sequelize;