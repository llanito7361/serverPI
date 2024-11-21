const {Router} = require('express')
const gamesRouter = require('./videogamesRouter')
const genresRouter = require('./genresRouter')
const platformsRouter = require('./platformsRouter')

const router = Router()



// router.get('/',(req,res)=>{
//     res.status(200).send('/estamos en el inicio, en / ')
// })
router.use('/games', gamesRouter) //funciona
router.use('/genres', genresRouter) //funciona
router.use('/platforms',platformsRouter ) //funciona

module.exports = router
