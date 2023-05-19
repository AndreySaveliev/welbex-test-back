const router = require('express').Router();
const { upload } = require('../uploader/uploader');
const { createPost, deletePost, editPost, getAllPosts } = require('../controllers/post');

router.post('/', upload.single('filedata'), createPost);
router.delete('/:postId', deletePost);
router.put('/:postId', editPost);
router.get('/', getAllPosts);

module.exports = router;
