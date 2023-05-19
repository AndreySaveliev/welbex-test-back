// import { createUser } from './controllers/user';
const { createUser, login } = require('./controllers/user');
const { auth } = require('./midllewares/auth');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/uploadfile', upload.single('filedata'), (req, res) => {
//   let fileData = req.file;
//   console.log(fileData);
//   if (!fileData) res.send('Ошибка при загрузке файла');
//   else res.send('Файл загружен');
// });

app.get('/uploadfile/:imgLocalName', (req, res) => {
  const {imgLocalName} = req.params
  try {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, `/uploads/${imgLocalName}`));
  } catch (err) {
    console.log(err);
  }
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth)

app.use('/post', require('./routes/post'))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
