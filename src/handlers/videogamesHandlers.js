const { v4: uuidv4, validate: isUuid } = require('uuid');
const {
  createGame,
  searchGameByName,
  getAllGames,
  searchById,
} = require("../controllers.js/videogamesControllers");


const getGameSHandler = async (req, res) => {
  const { name, page, pageSize } = req.query;

  try {
    if (name) {
      const juegosByName = await searchGameByName(name);
      res.status(200).send(juegosByName);
    } 
  else if(!page&!pageSize){
    const todoLoJuego = await getAllGames()
    res.status(200).send(todoLoJuego)
  }
    
    else {
      const allGames = await getAllGames();

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + parseInt(pageSize);
      const paginatedGames = allGames.slice(startIndex, endIndex);
    
      
      res.status(200).send(paginatedGames);
    }
  } catch (error) {
    res.send(error.message);
  }

  // res.send('NIY: un get pa todos los games')
};
//NIY
const getGameHandler = async (req, res) => {
  const { id } = req.params;
  const source = isUuid(id) ? "db" : "api";
  try {
    const juegoPorId = await searchById(id, source);
    res.status(200).send(juegoPorId);
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message);
  }
};
//terminado


const createGameHandler = async (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'El campo "name" es requerido' });
  }

  try {
    const newGame = await createGame(name);
    console.log('Juego creado:', newGame);
    res.status(200).json({ success: true, game: newGame });
  } catch (error) {
    console.error('Error al crear el juego:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getGameSHandler, getGameHandler, createGameHandler };
