mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
const student = mongoose.model('student', studentSchema);

module.exports = student;
