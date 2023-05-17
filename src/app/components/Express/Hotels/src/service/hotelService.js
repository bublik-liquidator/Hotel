const hotelRepository = require('../repository/hotelsRepository');

async function getAll(page, limit) {  
  return await hotelRepository.getAll(page, limit);
}

function create(hotel) {
  return hotelRepository.create(hotel);
}

function getById(hotelId) {
  return hotelRepository.getById(parseInt(hotelId, 10));
}
async function update(hotel, id) {
  return await hotelRepository.update(hotel, id);
}
function deleteById(hotelId) {
  return hotelRepository.deleteById(parseInt(hotelId, 10));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};