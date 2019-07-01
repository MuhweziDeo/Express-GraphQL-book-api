const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorSchema = new schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model('Author', authorSchema);