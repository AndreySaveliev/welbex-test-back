const router = require('express').Router();
const { upload } = require('../uploader/uploader');
const { createPost, deletePost, getAllPosts, editPost } = require('../controllers/post');

router.post('/', upload.single('filedata'), createPost);
router.put('/:postId', upload.single('filedata'), editPost);
router.delete('/:postId', deletePost);
router.get('/', getAllPosts);

module.exports = router;
