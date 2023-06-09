const express = require("express");
const router = express.Router();
const hotelService = require("../service/hotelService");

router.get("/", async (req, res) => {
  var page = parseInt(req.query.page);
  var limit = parseInt(req.query.limit);

  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 10;
  }
  const result = await hotelService.getAll(page, limit);
  res.json(result); 
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotel = await hotelService.getById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'hotel not found' });
    }
    return res.status(200).json((hotel));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }
});

router.post("/", (req, res) => {
  return res.json(hotelService.create(req.body));
});

router.put("/:id", async (req, res) => {
  const result = await hotelService.update(req.body,parseInt(req.params.id));
  return res.json(result);
});

router.delete("/:id", (req, res) => {
  const hotelId = req.params.id;
  return res.json(hotelService.deleteById(hotelId));
});


module.exports = router;
