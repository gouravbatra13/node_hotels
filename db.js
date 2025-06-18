const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

/**connection create */
mongoose.connect(mongoURL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
});


/**db object for connection */

const db = mongoose.connection;


/**Event listner connected predefine */
db.on('connected',()=>{
    console.log('server is connected');
})

/**Event listner disconnected predefine */

db.on('disconnected',()=>{
    console.log('server is disconnected');
})

/**Event listner error predefine */

db.on('error',(err)=>{
    console.log('server is',err);
})


/**Export db object */

module.exports = db;

