mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    students: {

        email: String,
        name: String,
        address: {
           street: String,
           zipcode: String,
           city: String,   
           }
        }
});


/*

*/
const User = mongoose.model('User', userSchema);

module.exports = User;
