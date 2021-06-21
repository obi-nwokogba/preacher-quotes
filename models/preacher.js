const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preacherSchema = new Schema({
    firstName: String,
    lastName: String,
    country: String,
    yearOfBirth: String,
    yearOfDeath: String,
    addedByUserId: String,
    preacherPhoto: String,
    assignedId: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Preacher'
    }
}, { timestamps: true });

const Preacher = mongoose.model('Preacher', preacherSchema);
module.exports = Preacher;



// 