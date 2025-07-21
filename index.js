const express = require('express')
const multer = require('multer')
const schedule = require('node-schedule')
const fs = require('fs')
const path = require('node:path');
const HOST = "http://localhost/"

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

// configure ejs
app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.use(express.json())

app.get('/', (req, res) => {
  console.log('index.html')
  res.render('index')
})

app.post('/upload', upload.single('file'), (req, res) => {
  const body = {id: req.file.filename.split('-')[0]}
  res.status(200).send(body)
})

/**
 * Route to access the download page
 */
app.get('/downloadPage/:id', (req, res) => {
  //console.log(`Paramètre ${JSON.stringify(req.params)}`)
  const files = fs.readdirSync('uploads/');
  const file = files.find(f => f.startsWith(req.params.id));
  if(file === undefined){
    res.status(404).end()
  }
  const filename = file.split('-')[1]
  res.render('downloadPage', {
    url: `${HOST}downloadFile/${req.params.id}`,
    name: filename
  })
})

/**
 * Route that deliver the file
 */
app.get('/downloadFile/:id', (req, res) => {
  //console.log(`Paramètre ${JSON.stringify(req.params)}`)
  res.status(204).send('Page en cours de maintenance')
})

app.listen(PORT, () => console.log(`Server listening ${PORT}`))