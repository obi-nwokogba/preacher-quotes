const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    preacherId: String,
    quoteText: String,
    quoteSourceType: String,
    quoteSourceURL: String,
    quoteSourceTitle: String,
    userId: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;