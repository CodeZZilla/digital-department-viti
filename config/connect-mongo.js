const mongoose = require('mongoose')
const mongoConfig = require('./config-mongo')

mongoose.connect( 'mongodb://' + mongoConfig.mongoDb.db.host + ':' + mongoConfig.mongoDb.db.port +
    '/' +  mongoConfig.mongoDb.db.db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log('connection to database established');
    }).catch(err => {
    console.log(`db error: ${err.message}`);
    process.exit(-1);
});