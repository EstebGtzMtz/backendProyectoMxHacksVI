const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validSizes = {
    values: ['Pequeño', 'Mediano', 'Grande'],
    message: '{VALUE} is not a valid size'
}

const Schema = mongoose.Schema;

const petsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Field name must be provided']
    },
    age: {
        type: Number,
        required: false
    },
    size: {
        type: String,
        default: 'Pequeño',
        enum: validSizes
    },
    lost: {
        type: Boolean,
        default: false
    },
    toAdoption: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        require: [true, 'field description must be provided']
    }
});

petsSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Pets', petsSchema);