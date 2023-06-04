const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Q156ap',
  port: 5432,
})
const getUser = (request, response) => {
  
  pool.query('SELECT * FROM  public."user" ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows);
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM public."user" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = async (request, response) => {

  try {
    const { name, email, password } = request.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    const newUser = await pool.query(
      'INSERT INTO user (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    // Create and sign the JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }



  // const { login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel} = request.body
  // pool.query('INSERT INTO public."user" (login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [login, password, rol, photo, name, many, birthday, phonenomber, email, bronirovhotel], (error, results) => {
  //   if (error) {
  //     throw error
  //   }

  //   response.status(201).json('user added with name: ${request.body.name}}')
  // })
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
}