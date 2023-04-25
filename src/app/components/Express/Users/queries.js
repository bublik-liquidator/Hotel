const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Q156ap',
  port: 5432,
})
const getUser = (request, response) => {
  pool.query('SELECT * FROM user ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows);
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM user WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, people, path_picturs, path_icons, cost } = request.body
  pool.query('INSERT INTO user (name, people, path_picturs, path_icons, cost) VALUES ($1, $2, $3, $4, $5)', [name, people, path_picturs, path_icons,cost], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).json('user added with name: ${request.body.name}}')
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, people, path_picturs, path_icons,cost } = request.body

    pool.query(
      'UPDATE user SET name = $1, people = $2, path_picturs = $3, path_icons = $4, cost = $5 WHERE id = $6',
      [name, people, path_picturs, path_icons,cost, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json('user modified with ID: ${id}')
      }
    ) 
}

const deleteUser = (request, response) => {
      const id = parseInt(request.params.id)

      pool.query('DELETE FROM user WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(`user deleted with ID: ${id}`)
      })
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}