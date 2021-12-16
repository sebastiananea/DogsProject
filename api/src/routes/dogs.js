const { Router } = require("express");
const { Dog, Temp } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { YOUR_API_KEY } = process.env;

const router = Router();

router.get("/", (req, res, next) => {
  let name = req.query.name;
  let dogsApi;
  let dogsDb;
  if (name) {
    dogsApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
    dogsDb = Dog.findAll({
      include: Temp,
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      order: [["name", "ASC"]],
    });
  } else {
    dogsApi = axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    dogsDb = Dog.findAll({
      include: Temp,
    });
  }
  Promise.all([dogsApi, dogsDb])
    .then((respuesta) => {
      const [dogsApi, dogsDb] = respuesta;
      let filteredDogsApi = dogsApi.data.map((dog) => {
        let finalObjApi = {
          id: dog.id,
          name: dog.name,
          weight: dog.weight.metric,
        };
        if (dog.image) {
          finalObjApi.img = dog.image.url;
        }
        return finalObjApi;
      });
      let allDogs = [...dogsDb, ...filteredDogsApi];
      res.send(allDogs);
    })
    .catch((error) => next(error));
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (typeof id === "string" && id.length > 8) {
      //bbdd
      let dog = await Dog.findByPk(id);
      res.send(dog);
    } else {
      //api
      let dog = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );

      res.send(dog.data.filter((el) => el.id === parseInt(id)));
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, height, weight } = req.body;
    const newDog = await Dog.create({
      name,
      height,
      weight,
    });
    res.send(newDog);
  } catch (error) {
    next(error);
  }
});

router.post("/:dogsId/temps/:tempsId", async (req, res, next) => {
  try {
    const { dogsId, tempsId } = req.params;
    const dog = await Dog.findByPk(dogsId);
    await dog.addTemp(tempsId);
    res.send(200);
  } catch (error) {
    next(error);
  }
});

router.put("/", (req, res) => {
  res.send("put /dogs");
});

router.delete("/", (req, res) => {
  res.send("delete /dogs");
});

module.exports = router;
