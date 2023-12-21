const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Not file uploaded' });
  }

  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileInfo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`)
});
