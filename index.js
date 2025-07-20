const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const PORT = 80

const app = express()

app.use(express.static('public'))

app.post('/upload', upload.single('file', (req, res, next) => {
  console.debug(req)
  res.send('Shared !')
}))

app.listen(PORT, () => console.log(`Server listening ${PORT}`))