const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '58dd89a3289a3c1c1ac22bb211';

// if (!ObjectID.isValid(id)) {
//     console.log('Id is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos);
// });

// findOne and findById returns an array not an object
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id ', todo);
// }).catch((e) => console.log(e));

User.findById('58dcf51c691801ef01014ddf').then((user => {
    if (!user) {
        return console.log('Unable to find user');
    }

    console.log(JSON.stringify(user, undefined, 2));

}, (e) => {
    console.log(e);
}));
