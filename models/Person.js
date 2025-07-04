const {
    type
} = require('express/lib/response');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the person schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


/**
 * convert password into hash with salt
 */

personSchema.pre('save', async function (next) {
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();

    try {
        //Hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash passwors
        const hashedPasswords = await bcrypt.hash(person.password, salt);

        //override the plain password with hash password
        person.password = hashedPasswords;

        next();
    } catch (error) {
        return next(error);
    }
})


/**decrypt password */
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}


//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;