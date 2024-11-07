const e = require('express');
const app = require('./app');
const config = require('./app/config/index');
const Database = require('./app/utils/mongodb_utils');

async function startServer() {
        try {
                await Database.connect(config.db.uri);
                app.listen(config.app.port, () => {
                        console.log(`Server is running on port ${config.app.port}`);
                });
        } catch (error) {
                console.error('Error starting server: ', error);
        }
}

startServer();