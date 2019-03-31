const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
    },

    userType: {
        type: String,
        required: true,
    }
})

// encode and decode
userSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })

    next();
})


userSchema.methods.comparePassword = function(_password) {

    return bcrypt.compareSync(_password, this.password);
}

// encode and decode-end


module.exports = mongoose.model('user', userSchema, 'users')