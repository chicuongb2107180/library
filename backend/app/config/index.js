const config = {
        app: {
                port: process.env.PORT || 3003
        },
        db: {
                uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/librarymanagement',
        }
};
module.exports = config;