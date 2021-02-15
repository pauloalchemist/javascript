const router = require('express').Router()
const postService = require('../service/postService')

router.get('/posts', async function (req, res) {
  const posts = await postService.getPost()
  res.json(posts)
})

router.post('/posts', async function (req, res) {
  const post = req.body
  const newPost = await postService.savePost(post)
  res.json(newPost)
})

module.exports = router
