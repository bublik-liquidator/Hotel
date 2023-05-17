const schema = require("../validation/hotel");
const pino = require("pino");
const pretty = require("pino-pretty");
const loggerr = pino(pretty());
const db = require("../config/dbProvider");

const paginate = require("../pagination/pagination");

loggerr.info(process.env.POSTGRESQL_PORT);

async function getAll(page, size) {
  const { rows } = await db.pool.query(
    "SELECT * FROM hotel ORDER BY id OFFSET $1 LIMIT $2",
    [(page - 1) * size, size]
  );
  return rows;
}

function create(hotel) {
  {
      const { name, people, path_picturs, path_icons, cost } = hotel;

    db.pool.query(
      "INSERT INTO hotel (name, people, path_picturs, path_icons, cost) VALUES ($1, $2, $3, $4, $5)",
      [name, people, path_picturs, path_icons, cost],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
    return hotel;
  }
}
async function update(hotel,id) {
  const query = "UPDATE hotel SET name = $1, people = $2, path_picturs = $3, path_icons = $4, cost = $5 WHERE id = $6 RETURNING *";
  const values = [hotel.name, hotel.people, hotel.path_picturs, hotel.path_icons, hotel.cost, id];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Hotel ${id} updated successfully.");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
  }
}
async function getById(id) {
  const query = "SELECT * FROM hotel WHERE id = $1";
  const values = [id];
  const { rows } = await db.pool.query(query, values);
  loggerr.info("hotelID name " + rows[0].name);
  return rows[0];
}

async function deleteById(id) {
  const query = {
    text: "DELETE FROM hotel WHERE id = $1",
    values: [id],
  };

  try {
    const res = await db.pool.query(query);
    return res.rowCount;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getAll,
  create,
  update,
  getById,
  deleteById,
};
