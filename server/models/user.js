const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
    values: ['FREE', 'BASIC', 'PREMIUM'],
    message: '{VALUE} is not a valid role'
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Field name must be provided']
    },
    lastName: {
        type: String,
        required: [true, 'Field BASIClastName must be provided']
    },
    age: {
        type: Number,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Field phoneNumber must be provided']
    },
    email: {
        type: String,
        required: [true, 'Field email must be provided'],
        unique: [true, 'email is already exist']
    },
    password: {
        type: String,
        required: [true, 'Field password is necessary']
    },
    img: {
        type: String,
        required: false
    },
    plan: {
        type: String,
        default: 'FREE',
        enum: validRoles
    },
    havePets: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

//Hide password from JSON
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', userSchema);