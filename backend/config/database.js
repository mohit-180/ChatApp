const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Mongo DB Database connected successfully');
        })
        .catch((error) => {
            console.error('Database connection failed:', error);
        });
};

module.exports = databaseConnect;
