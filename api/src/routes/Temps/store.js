const { YOUR_API_KEY } = process.env
const axios = require('axios')
const { Op } = require('sequelize')
const { Dog, Temp } = require('../../db')

async function getTemps() {
  const dogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  )
  const temps = dogs.data.map((dog) => dog.temperament)
  let result = []
  temps.forEach((element) => {
    if (element)
      result = [...result, ...element.split(',').map((item) => item.trim())]
  })
  let uniqueItems = [...new Set(result)]
  let findCreate = uniqueItems.map(async (el) => {
    await Temp.findOrCreate({
      where: {
        name: el,
      },
    })
  })
  const finalUnique = await Temp.findAll({ order: [['name', 'ASC']] })
  return finalUnique
}

module.exports = { getTemps }
