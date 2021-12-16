const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temp } = require("../../db");

//busca los perros de la api
async function getDogApi(name) {
  try {
    let dogsApi;
    if (name) {
      dogsApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name.toLowerCase()}`
      );
    } else {
      dogsApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
      );
    }
    let filteredDogsApi = await dogsApi.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.metric,
        img: dog.image
          ? dog.image.url
          : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        temperament: dog.temperament,
      };
    });

    return filteredDogsApi;
  } catch (error) {
    return error;
  }
}

//busca en la bd la raza
async function getBreedDb(name) {
  try {
    let breedDb;
    if (name) {
      breedDb = await Dog.findAll({
        include: Temp,
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        order: [["name", "ASC"]],
      });
    } else {
      breedDb = Dog.findAll({
        include: Temp,
      });
    }
    return breedDb;
  } catch (error) {
    return error;
  }
}

//Crea un nuevo dog en la bbdd
async function postNewDog(name, height, weight, age, temperament, tempsString) {
  if (!age) {
    age = null;
  }
  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      age,
      temperament,
      tempsString,
    });

    if (temperament) {
      const temp = await Temp.findAll({
        where: {
          name: temperament,
        },
      });
      newDog.addTemp(temp);
    }

    return newDog;
  } catch (error) {
    return "No se pudo agregar un nuevo perro :C ";
  }
}

async function resultDogObj(dogFilteredId) {
  return {
    name: dogFilteredId.name,
    img: dogFilteredId.image.url,
    temperament: dogFilteredId.temperament,
    height: dogFilteredId.height,
    weight: dogFilteredId.weight,
    age: dogFilteredId.life_span,
  };
}

module.exports = {
  getDogApi,
  postNewDog,
  getBreedDb,
  resultDogObj,
};
