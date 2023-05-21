const { prisma } = require('../prisma/prismadb');
const fs = require('fs');
const path = require('path');

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
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });
    if (!post.media) {
      const deletedPost = await prisma.post.delete({
        where: {
          id: post.id
        }
      });
      return res.status(200).send(deletedPost);
    }
    fs.unlink(path.join(__dirname, `../uploads/${post.media}`), async (err) => {
      if (err) {
        console.log(err);
        res.status(409).send('COULD NOT DELETE');
      } else {
        const deletedPost = await prisma.post.delete({
          where: {
            id: post.id
          }
        });
        res.status(200).send({ message: 'POST DELETED' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

// const editPost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { body, media } = req.body;
//     const post = await prisma.post.update({
//       where: {
//         id: postId
//       },
//       data: {
//         body: body,
//         media: media
//       }
//     });
//     res.status(200).send(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('INTERNAL ERROR');
//   }
// };

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
    const media = req.file;
    console.log(media);
    const user = req.user._id;

    if (!body && !media) {
      res.status(400).send({ message: 'BAD REQUST' });
    }

    // const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!media) {
      const updatedPost = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          body: body
        }
      });
      res.status(200).send(updatedPost);
    }
    if (body && media) {
      const updatedPost = await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          body: body,
          media: media.originalname ? media.originalname : null
        }
      });

      res.status(200).send(updatedPost);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('INTERNAL ERROR');
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({});
    res.status(200).send(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'INTERNAL ERROR' });
  }
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllPosts
};
