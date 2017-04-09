const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 10
};

// sign takes a variable and a secret for hashing
// following token is what will be sent to user and saved in mongo
var token = jwt.sign(data, 'secret123');
console.log(token);

var decoded = jwt.verify(token, 'secret123');
console.log('decoded: ', decoded);

// var message = 'I am user number 444';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// // data we want to send back to the client is the user id

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somestringsecret').toString()
// }

// // check what we get back
// var resultHash = SHA256(JSON.stringify(token.data) + 'somestringsecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed!!');
// }