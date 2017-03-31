const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// remove won't send documents back
Todo.remove({}).then((result) => {
    console.log(result);
});

// findOneAndRemove will send the docuement back that was deleted.
Todo.findAndRemove({_id: '57nnffasdf'}).then((todo) => {
    console.log(todo);
})

Todo.findByIdAndRemove('57nnffasdf').then((todo) => {
    console.log(todo);
})