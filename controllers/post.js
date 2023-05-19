const { prisma } = require('../prisma/prismadb');

const createPost = async (req, res) => {
  try {
    const { body, media } = req.body;
    const user = req.user._id;
    const post = await prisma.post.create({
      data: {
        body: body,
        media: media,
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
    const {postId} = req.params
    const post = await prisma.post.delete({
      where: {
        id: postId
      }
    })
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

const editPost = async (req, res) => {
  try {
    const {postId} = req.params
    const {body, media} = req.body
    const post = await prisma.post.update({
      where: {
        id: postId
      },
      //после обновления поста не будем изменять дату его создания
      data: {
        body: body,
        media: media
      }
    })
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};


module.exports = {
  createPost,
  deletePost,
  editPost
};
