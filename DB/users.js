const mongoose = require('mongoose')
const user = mongoose.model('user',{
    firstName: {
            type: String
        },
        age: {
            type: Number
        }
    })
    
module.exports = user
