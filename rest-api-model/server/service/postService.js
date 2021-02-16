const postData = require('../data/postData')

exports.getPosts = () => {
  return postData.getPosts()
}

exports.getPost = (id) => {
  return postData.getPost(id)
}

exports.savePost = (post) => {
  return postData.savePost(post)
}

exports.deletePost = (id) => {
  return postData.deletePost(id)
}

exports.updatePost = (id, post) => {
  return postData.updatePost(id, post)
}
