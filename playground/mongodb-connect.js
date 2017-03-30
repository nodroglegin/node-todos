// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj.getTimestamp());

// Object destructuring
// var user = {name: "Andrew", age:25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
        return console.log('Unable to connect to mongo db');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result)  => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })


//    db.collection('Users').insertOne({
//         name: 'Barry Smith',
//         age: 28,
//         location: "Pymble"
//     }, (err, result)  => {
//         if (err) {
//             return console.log('Unable to insert user', err);
//         }

//         console.log(JSON.stringify(result.ops, undefined, 2))
//     })

    db.close();
});

