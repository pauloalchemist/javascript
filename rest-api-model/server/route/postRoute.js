const router = require('express').Router()
const postService = require('../service/postService')

router.get('/posts', async function (req, res) {
  const posts = await postService.getPost()
  res.json(posts)
})
router.get('/posts/:id')
router.post('/posts')
router.put('/posts/:id')
router.delete('posts/:id')

module.exports = router
