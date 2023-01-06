const mongoose = require('mongoose')

const confessSchema = new mongoose.Schema({
    confess:{
        required: true,
        type: 'string',
        trim: true
    },
    group:{
        required: true,
        type: 'string'
    }

})

const Confess = mongoose.model('Confess', confessSchema)

module.exports = Confess