// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
        return console.log('Unable to connect to mongo db');
    }
    console.log('Connected to MongoDB server');


    // db.collection.findOneAndUpdate(filter, update, options)
    // findOneAndUpdate() updates the first matching document in the collection that matches the filter. 
    // The sort parameter can be used to influence which document is updated.
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('58dcb134d8ac4ee6c1147d5e')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    // db.close();
});

