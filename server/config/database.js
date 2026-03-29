const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DATABASE_URL) {
    // Production: PostgreSQL on Render
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    });
} else if (process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL environment variable is required in production! Add it in Render dashboard.');
} else {
    // Local development: SQLite
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', process.env.DB_STORAGE || './database.db'),
        logging: false
    });
}

module.exports = sequelize;