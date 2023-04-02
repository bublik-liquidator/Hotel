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
    response.setHeader("Access-Control-Allow-Origin", "*");//
    response.status(200).json(results.rows);
  })
}

const getHotelById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM hotel WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Access-Control-Allow-Origin", "*");//
    response.status(200).json(results.rows)
  })
}

const createHotel = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO hotel (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.setHeader("Access-Control-Allow-Origin", "*");//

    response.status(201).send(`Hotel added with ID: ${results.insertId}`)
  })
}

const updateHotel = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE hotel SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Hotel modified with ID: ${id}`)
    }
  )
}

const deleteHotel = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM hotel WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Hotel deleted with ID: ${id}`)
  })
}

module.exports = {
  getHotel,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
}