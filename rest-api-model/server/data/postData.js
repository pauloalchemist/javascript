const database = require('../infra/connectionDb')

exports.getPost = () => {
  return database.query('select * from blog.post')
}
