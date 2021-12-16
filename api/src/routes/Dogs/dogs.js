const { Router } = require("express");
const { Dog, Temp } = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { YOUR_API_KEY } = process.env;
const { getDogApi, getBreedDb, postNewDog, resultDogObj } = require("./store");

const router = Router();

//trae los dogs de la api + bbdd
// /dogs trae todos, /dogs?name= trae las razas que coinciden con el query
router.get("/", async (req, res, next) => {
  let name = req.query.name;
  const resultApi = await getDogApi(name);
  const resultDb = await getBreedDb(name);
  if (resultApi.length === 0 && resultDb.length === 0)
    res.send({ error: true, message: "No matches found" });
  const concatResults = [...resultApi, ...resultDb];
  res.send(concatResults);
});

//crea un nuevo dog en la bbdd
router.post("/", async (req, res, next) => {
  const { name, weight, height, age, temperament, tempsString } = req.body;

  if (!name || !weight || !height) {
    res.status(404).send("name, weight and height are required");
  }
  try {
    const resPost = await postNewDog(
      name,
      weight,
      height,
      age,
      temperament,
      tempsString
    );
    res.send(resPost);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (typeof id === "string" && id.length > 8) {
      //bbdd
      let dog = await Dog.findOne({
        where: {
          id: id,
        },
        include: {
          model: Temp,
        },
      });
      if (dog) {
        res.send(dog);
      } else {
        res.status(404).send("No hay coincidencias");
      }
    } else {
      //api
      let dog = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );
      let dogFilteredId = dog.data.filter((el) => el.id === parseInt(id));
      let dogObj;

      if (dogFilteredId.length === 0) {
        res.status(404).send("No hay coincidencia en la api");
      } else {
        dogObj = await resultDogObj(dogFilteredId[0]);
        res.send(dogObj);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
