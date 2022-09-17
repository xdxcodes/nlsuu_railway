const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({

    name:{ 
        type: String,
        required: true,
        trim: true

     },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
         if (!validator.isEmail(value)) {
             throw new Error('Invalid email address')
         }
        }
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Dont set user password as password')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }], 

    },
        {
            timestamps: true
        })

AdminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, 'murielssenderos')
       user.tokens = user.tokens.concat({token})
       await user.save()
       return token 
    }
   
    AdminSchema.statics.findByCredentials = async (email, password) => {
        const user = await Admin.findOne({email})
        if(!user) { 
            throw new Error('User not found')
        }
   
        const isMatch = await bcrypt.compare(password, user.password)
   
        if(!isMatch) { 
            throw new Error('Wrong Password')
        }
   
        return user
    }
   
   
   
   //Plain text to hash middleware
   AdminSchema.pre('save', async function (next) {
       const user = this
       if(user.isModified('password')) {
           user.password = await bcrypt.hash(user.password, 8)
       }
   
       next() 
   })
   



const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin




//Email Validation for tnnlu.ac.in

// var idx = emailAddress.lastIndexOf('@');
// if (idx > -1 && emailAddress.slice(idx + 1) === 'tnnlu.ac.in') {
//   // true if the address ends with yahoo.com
// }