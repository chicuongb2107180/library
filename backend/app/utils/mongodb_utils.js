const { mongoose } = require('mongoose');

class Database {
        static async connect(uri) {
                try {
                        const connection = await mongoose.connect(uri);
                        console.log('Database connected');
                        return connection;
                } catch (error) {
                        console.error('Database connection failed', error);
                }
        }
}

module.exports = Database;