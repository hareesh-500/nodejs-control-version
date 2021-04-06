const express = require('express')
const router = express.Router()

const controller = require('../src/controller/controller')
router.get('/',(req,res)=>{
    res.send('hai..')
})
router.post('/api/user', controller.insertData)

module.exports = router