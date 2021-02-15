const database = require('../infra/connectionDb')

exports.getPost = () => {
  return database.query('select * from blog.post')
}

exports.savePost = () => {
  return database.one(
    'insert into blog.post (title, content) values ($1, $2) returning *', [post.title, post.content]
  )
}
