const { default: axios } = require("axios");
const { Router } = require("express");
const { Dog, Temp } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const tempsApi = await axios.get();
    return Temp.findAll().then((temp) => res.send(temp));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newTemp = await Temp.create({
      name,
    });
    res.send(newTemp);
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res) => {
  res.send("put /temps");
});

router.delete("/", (req, res) => {
  res.send("delete /temps");
});

module.exports = router;
