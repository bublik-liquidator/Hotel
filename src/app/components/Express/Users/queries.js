const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Q156ap',
  port: 5432,
})

const getUser = async(request, response)=> {
   {
    const result = await pool.query('SELECT * FROM  public."user" ORDER BY id ASC',(error, results) => {
      if (error) {
        throw error
      }      
      response.status(200).json(results.rows);
    });
  }
}

const getUserById = (request, response) => {
  const id = (request.params.id)
  console.log("ID "+id)
  pool.query('SELECT * FROM public."user" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results.rows[0])   
})
}

////////////
const getCpechUserById = async (request, response) => {
  {
    const result = await pool.query('SELECT * FROM useriid ORDER BY id ASC',(error, result) => {
      if (error) {
        throw error
      }      
      response.status(200).json(result.rows[0]);
    });
  }
}
const putUser = async (request,response )=>{
  const { id, rol,vhod } = request.body
    pool.query('UPDATE useriid SET id_user = $1, rol = $2, vhod = $3 WHERE id = $4', [id, rol,vhod,1], (error, w) => {
    if (error) {
      throw error
    }
    response.status(200).json('user modified with id_user: '+{id})
}) 
}

////////////


const createUser = async (request, response) => {
  const { login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel} = request.body
  pool.query('INSERT INTO public."user" (login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).json('user added with name: ${request.body.name}}')
  })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel } = request.body

    pool.query(
      'UPDATE public."user" SET login = $1, password = $2, rol = $3, photo = $4, name = $5, many = $6, birthday = $7, phonenomber = $8, email = $9, bronirovhotel = $10 WHERE id = $11',
      [login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel, id],
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

      pool.query('DELETE FROM public."user" WHERE id = $1', [id], (error, results) => {
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
 getCpechUserById,
 putUser,
}