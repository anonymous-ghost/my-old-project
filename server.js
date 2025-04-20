const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Налаштування multer для збереження файлів
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/posters/');
  },
  filename: function (req, file, cb) {
    // Зберігаємо оригінальне ім'я файлу
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Маршрут для завантаження файлів
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ 
    filename: req.file.filename,
    path: `/posters/${req.file.filename}`
  });
});

// Статичні файли
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
