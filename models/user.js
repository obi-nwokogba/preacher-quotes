const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    displayName: String,
    password: String,
    hashedpassword: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;