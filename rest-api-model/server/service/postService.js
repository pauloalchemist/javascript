const postData = require('../data/postData')

exports.getPost = () => {
  return postData.getPost()
}

exports.savePost = (post) => {
  return postData.savePost(post)
}

exports.deletePost = (id) => {
  return postData.deletePost(id)
}
