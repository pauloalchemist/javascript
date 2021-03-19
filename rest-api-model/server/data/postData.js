const database = require('../infra/connectionDb')

module.exports = {
  getPosts () {
    return database.query('select * from blog.post')
  },

  getPost (id) {
    return database.oneOrNone('select * from blog.post where id = $1', [id])
  },

  getPostByTitle (title) {
    return database.oneOrNone('select * from blog.post where title = $1', [title])
  },

  savePost (post) {
    return database.one(
      'insert into blog.post (title, content) values ($1, $2) returning *', [post.title, post.content]
    )
  },

  updatePost (id, post) {
    return database.none(
      'update blog.post set title = $1, content = $2 where id = $3', [post.title, post.content, id]
    )
  },

  deletePost (id) {
    return database.none('delete from blog.post where id = $1', [id])
  }
}
