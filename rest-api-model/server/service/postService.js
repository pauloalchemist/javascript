const postData = require('../data/postData')

exports.getPosts = () => {
  return postData.getPosts()
}

exports.getPost = async (id) => {
  const post = await postData.getPost(id)

  if (!post) throw new Error('Post não enconstrado')
  return post
}

exports.savePost = (post) => {
  return postData.savePost(post)
}

exports.deletePost = (id) => {
  return postData.deletePost(id)
}

exports.updatePost = async (id, post) => {
  await exports.getPost(id)
  return postData.updatePost(id, post)
}
