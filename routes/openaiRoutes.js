const express = require('express')
const { generateImage } = require('../controllers/openaiController')
const router = express.Router()

router.post('/generateimage', generateImage)

// router.post('/generateimage', (req, res) => {
//     console.log(req.body)
//     res.status(200).json({
//         success: true,
//     })
// })

module.exports = router