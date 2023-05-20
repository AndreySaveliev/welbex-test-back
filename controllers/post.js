const { prisma } = require('../prisma/prismadb');
const createPost = async (req, res) => {
  try {
    const { body } = req.body;
    const media = req.file;

    const user = req.user._id;
    if (!body && !media) {
      res.status(400).send({ message: 'BAD REQUST' });
    }

    const post = await prisma.post.create({
      data: {
        body: body,
        media: media?.originalname,
        author: {
          connect: {
            id: user
          }
        }
      }
    });

    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: postId
      }
    });
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body, media } = req.body;
    const post = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        body: body,
        media: media
      }
    });
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({});
    res.status(200).send(allPosts)
  } catch (err) {
    console.log(err)
    res.status(500).send({message: "INTERNAL ERROR"})
  }
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllPosts
};
