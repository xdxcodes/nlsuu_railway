const mongoose = require('mongoose')

const confessSchema = new mongoose.Schema({
    confess:{
        required: true,
        type: 'string',
        trim: true
    }

})

const Confess = mongoose.model('Confess', confessSchema)

module.exports = Confess