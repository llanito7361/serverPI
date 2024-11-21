const {Router} = require('express') 
const {getGameSHandler,
    getGameHandler,
    createGameHandler} =  require('../handlers/videogamesHandlers')
    
const gamesRouter = Router()

gamesRouter.get('/', getGameSHandler) // funciona

gamesRouter.get('/:id', getGameHandler)// funca todo

gamesRouter.post('/', createGameHandler) //funciona

module.exports = gamesRouter ; 