const { default: axios } = require('axios')
const { Router } = require('express')
const { Dog, Temp } = require('../../db')
const { getTemps } = require('./store')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const resultTemps = await getTemps()
    res.send(resultTemps)
    // return Temp.findAll().then((temp) => res.send(temp))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body
    const newTemp = await Temp.create({
      name,
    })
    res.send(newTemp)
  } catch (error) {
    next(error)
  }
})

module.exports = router
