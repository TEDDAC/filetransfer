const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback){
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`
    callback(null, uniquePreffix + '-' + file.originalname)
  }
})
const upload = multer({storage: storage})
const PORT = 80

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.post('/upload', upload.single('file'), function (req, res) {
  //console.log(req.file)
  const body = {id: req.file.filename.split('-')[0]}
  //console.log(body)
  res.status(200).send(body)
})

app.listen(PORT, () => console.log(`Server listening ${PORT}`))