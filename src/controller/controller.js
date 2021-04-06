const User = require('../../DB/users')
exports.insertData = async (req,res) => {
    const {firstName,age} = req.body
    let user = {}
    user.firstName = firstName
    user.age = age
    const insert = new User(user)
    await insert.save()
    res.send(insert)
}