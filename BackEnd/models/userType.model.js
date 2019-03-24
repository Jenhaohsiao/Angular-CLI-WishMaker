const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    authorization: [{
        pageName: {
            type: String,
            required: true,
        },
        access: {
            type: Boolean,
            required: false,
            deault: false,
        },
        edit: {
            type: Boolean,
            required: false,
            deault: false,
        },

    }]

})

module.exports = mongoose.model('userType', userTypeSchema)