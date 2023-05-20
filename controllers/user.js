const bcrypt = require('bcryptjs/dist/bcrypt');
const { prisma } = require('../prisma/prismadb');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        hashedPassword: hashedPassword
      }
    });

    res.send(createdUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'ne rabotaet' });
  }
};

const login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isValidPassword) {
      res.status(401).send({ message: 'Unauthenticated' });
    }

    const token = jwt.sign({ _id: user.id }, JWT_SECRET, {expiresIn: '7d' });

    res.cookie('Welbex', token, {
      maxAge: 900000 * 20,
      httpOnly: true,
      sameSite: 'none',
      secure: 'false'
    });

    res.send({user, token});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'ne rabotaet' });
  }
};

const checkUser = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await prisma.user.findUnique({
      where: {
      id: userId
      }
    })
    res.status(200).send(user)
  } catch {
    res.status(500).send({message: 'INTERNAL ERROR'})
  }
}

module.exports = {
  createUser,
  login,
  checkUser
};
