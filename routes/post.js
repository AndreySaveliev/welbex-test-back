const router = require('express').Router();

const { createPost, deletePost, editPost } = require('../controllers/post');


router.post('/', createPost);
router.delete('/:postId', deletePost);
router.put('/:postId', editPost);

module.exports = router