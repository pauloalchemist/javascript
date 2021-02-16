const router = require('express').Router()
const postService = require('../service/postService')

router.get('/posts', async function (req, res) {
  const posts = await postService.getPosts()
  res.json(posts)
})

router.post('/posts', async function (req, res) {
  const post = req.body
  const newPost = await postService.savePost(post)
  res.json(newPost)
})

router.put('/posts/:id', async function (req, res) {
  const post = req.body
  await postService.updatePost(req.params.id, post)
  res.end()
})

router.delete('/posts/:id', async function (req, res) {
  await postService.deletePost(req.params.id)
  res.end()
})

module.exports = router
