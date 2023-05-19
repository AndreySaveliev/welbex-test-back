// import { createUser } from './controllers/user';
const { createUser, login } = require('./controllers/user');
const {auth} = require('./midllewares/auth')
const express = require('express');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth)

app.use('/post', require('./routes/post'))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
