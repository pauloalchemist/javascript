const router = require('express').Router()
const postService = require('../service/postService')

router.get('/posts', async function (req, res) {
  const posts = await postService.getPosts()
  res.json(posts)
})

router.post('/posts', async function (req, res) {
  const post = req.body
  const newPost = await postService.savePost(post)
  res.status(201).json(newPost)
})

router.put('/posts/:id', async function (req, res) {
  const post = req.body
  try {
    await postService.updatePost(req.params.id, post)
    res.status(204).end()
  } catch (e) {
    res.status(404).send(e.message)
  }
})

router.delete('/posts/:id', async function (req, res) {
  await postService.deletePost(req.params.id)
  res.status(204).end()
})

module.exports = router
