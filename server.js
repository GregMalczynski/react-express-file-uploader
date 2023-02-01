const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 5000

app.use(cors())
app.use(fileUpload())

app.post('/upload', (req, res) => {
    setTimeout(() => {
    
        const file = req.files.file

        file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
            if(err) {
                console.error(err)
                return res.status(500).send(err)
            }
        })
            console.log('file uploaded')
            return res.status(200).json({fileName: file.name, filePath: `upload/${file.name}`})
    }, 1500)
})

app.delete('/upload', (req, res) => {
    console.log('file deleted here')
    fs.unlinkSync(`${__dirname}/client/public/upload/${req.body.name}`)
    return res.status(200).json({msg: 'file deleted here'})
})

app.listen(port, () => console.log(`Server started at port : ${port}`))