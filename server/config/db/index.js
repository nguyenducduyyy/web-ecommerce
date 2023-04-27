const mongoose = require('mongoose')
async function connect() {
    // try{
    //     await mongoose.connect('mongodb://127.0.0.1/web_shopet',
    //        {
            
    //        }
    //     );
    // }
    // catch(err){
    //     console.log('failure');
    // }
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://127.0.0.1/web_shopet', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
}


module.exports = {connect};