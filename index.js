const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback){
    const uniquePreffix = `${Date.now()}${Math.round(Math.random() * 1E9)}`
    callback(null, uniquePreffix + '-' + file.originalname)
  }
})
const upload = multer({storage: storage})
const PORT = 80

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.post('/upload', upload.single('file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file)
  res.send({status: 200})
})

app.listen(PORT, () => console.log(`Server listening ${PORT}`))