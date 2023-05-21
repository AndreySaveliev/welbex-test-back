// import { createUser } from './controllers/user';
const { createUser, login } = require('./controllers/user');
const { auth } = require('./midllewares/auth');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const allowOrigins = ['http://localhost:3000', 'http://127.0.0.1:5173'];

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/uploadfile', upload.single('filedata'), (req, res) => {
//   let fileData = req.file;
//   console.log(fileData);
//   if (!fileData) res.send('Ошибка при загрузке файла');
//   else res.send('Файл загружен');
// });

app.get('/uploadfile/:imgLocalName', (req, res) => {
  const { imgLocalName } = req.params;
  try {
    res.sendFile(path.join(__dirname, `/uploads/${imgLocalName}`));
  } catch (err) {
    console.log(err);
  }
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/post', require('./routes/post'));
app.use('/user', require('./routes/user'));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
