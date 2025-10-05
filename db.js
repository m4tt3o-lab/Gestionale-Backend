import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
//import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

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
  .then(() => console.log('Connesso al database sqlite'))
  .catch(err => console.error('Impossibile connettersi:', err));

export default sequelize;