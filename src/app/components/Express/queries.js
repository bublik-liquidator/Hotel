const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Q156ap',
  port: 5432,
})
const getHotel = (request, response) => {
  pool.query('SELECT * FROM hotel ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows);
  })
}

const getHotelById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM hotel WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createHotel = (request, response) => {
  const { name, people, path_picturs, path_icons, cost } = request.body
  pool.query('INSERT INTO hotel (name, people, path_picturs, path_icons, cost) VALUES ($1, $2, $3, $4, $5)', [name, people, path_picturs, path_icons,cost], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).json('Hotel added with name: ${request.body.name}}')
  })
}

const updateHotel = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, people, path_picturs, path_icons,cost } = request.body

    pool.query(
      'UPDATE hotel SET name = $1, people = $2, path_picturs = $3, path_icons = $4, cost = $5 WHERE id = $6',
      [name, people, path_picturs, path_icons,cost, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json('Hotel modified with ID: ${id}')
      }
    ) 
}

const deleteHotel = (request, response) => {
      const id = parseInt(request.params.id)

      pool.query('DELETE FROM hotel WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(`Hotel deleted with ID: ${id}`)
      })
}

module.exports = {
  getHotel,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
}