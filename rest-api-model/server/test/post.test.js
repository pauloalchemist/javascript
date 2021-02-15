const axios = require('axios')
const postsService = require('../service/postService')
const crypto = require('crypto')

const generate = () => {
  return crypto.randomBytes(20).toString('hex')
}

const request = function (url, method, data) {
  return axios({ url, method, data })
}

test('Should get posts', async function () {
  const post1 = postsService.savePost({ title: generate(), content: generate() })
  const post2 = postsService.savePost({ title: generate(), content: generate() })
  const post3 = postsService.savePost({ title: generate(), content: generate() })
  const response = await request('http://localhost:3000/posts', 'get')
  const posts = response.data
  expect(posts).toHaveLength(3)
  await postsService.deletePost(post1.id)
  await postsService.deletePost(post2.id)
  await postsService.deletePost(post3.id)
})

test('Should save posts', async function () {
  const post1 = { title: generate(), content: generate() }
  const response = await axios({
    url: 'http://localhost:3000/posts',
    method: 'get'
  })
  const posts = response.data
  expect(posts).toHaveLength(3)
  await postsService.deletePost(post1.id)
})
