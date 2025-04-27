const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Инициализация хранилища в сессии
app.use((req, res, next) => {
  if (!req.session.messages) {
    req.session.messages = [];
  }
  next();
});

// Обработчик POST /api/messages
app.post('/api/messages', (req, res) => {
  const { text, productId, user } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  req.session.messages.push({ text, productId, user});
  res.status(200).json({ text, productId, user});
});

// Обработчик GET /api/messages
app.get('/api/messages', (req, res) => {
  res.json({ messages: req.session.messages });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
