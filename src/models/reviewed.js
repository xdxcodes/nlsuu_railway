const mongoose = require('mongoose')

const confessPublicSchema = new mongoose.Schema({
    confess:{
        required: true,
        type: 'string',
        trim: true
    }

},
{
    timestamps: true
}
)

const ConfessPublic = mongoose.model('ConfessPublic', confessPublicSchema)

module.exports = ConfessPublic