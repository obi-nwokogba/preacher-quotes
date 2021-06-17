const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    preacherID: String,
    quoteText: String,
    quoteSourceType: String,
    quoteSourceURL: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;