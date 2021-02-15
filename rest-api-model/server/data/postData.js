const database = require('../infra/connectionDb')

exports.getPost = () => {
  return database.query('select * from blog.post')
}

exports.savePost = (post) => {
  return database.one(
    'insert into blog.post (title, content) values ($1, $2) returning *', [post.title, post.content]
  )
}

exports.deletePost = (id) => {
  return database.none('delete from blog.post where id = $1', [id])
}
