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

router.get("/:id", (req, res) => {
  return res.json(hotelService.getById(req.params.id));
});

router.post("/", (req, res) => {
  return res.json(hotelService.create(req.body));
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //подключить файл
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
