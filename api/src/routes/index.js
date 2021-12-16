const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoute = require('../routes/Dogs/dogs')
const tempsRoute = require('../routes/Temps/temps')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoute)
router.use('/temps', tempsRoute)

module.exports = router
