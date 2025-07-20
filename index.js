const express = require('express')
const multer = require('multer')
const schedule = require('node-schedule')
const fs = require('fs')

/**
 * Remove every files older than 7 days.
 * Run each hour
 */
const job = schedule.scheduleJob('0 * * * *', () => {
  console.log('Cleaning uploads...')

  fs.readdir('uploads/', (err, files) => {
    if (err) return console.error('Error reading uploads directory:', err);
    const now = Date.now();
    files.forEach(file => {
      const filePath = `uploads/${file}`;
      fs.stat(filePath, (err, stats) => {
        if (err) return console.error('Error stating file:', err);
        if (now - stats.mtimeMs > 7 * 24 * 60 * 60 * 1000) {
          fs.unlink(filePath, err => {
            if (err) console.error('Error deleting file:', err);
            else console.log(`Deleted: ${filePath}`);
          });
        }
      });
    });
  });
})

/**
 * Describe where and hour file are stored
 */
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

app.use(express.json())

app.post('/upload', upload.single('file'), function (req, res) {
  const body = {id: req.file.filename.split('-')[0]}
  res.status(200).send(body)
})

/**
 * Route to access the download page
 */
app.get('/downloadPage/:id', (req, res) => {
  //console.log(`Paramètre ${JSON.stringify(req.params)}`)
  res.status(200).send('Page en cours de maintenance')
})

/**
 * Route that deliver the file
 */
app.get('/download/:id', (req, res) => {
  //console.log(`Paramètre ${JSON.stringify(req.params)}`)
  res.status(204).send('Page en cours de maintenance')
})

app.use(express.static('public'))

app.listen(PORT, () => console.log(`Server listening ${PORT}`))