const { v4: uuidv4, validate: isUuid } = require('uuid');
const {Videogame, Platform, Genre, apikey, testeo} = require('../db')
const {Op} = require('sequelize')
const axios = require('axios')

const cleanArray = (array) => {
    return array.map(elemento => {
      const cleanedGame = {
        name: elemento.name,
        id: elemento.id,
        image: elemento.background_image,
        rating: elemento.rating,
        created: false,
        platforms: elemento.platforms.map(el => ({
            name: el.platform.name,
            backgroundImage: el.platform.image_background,
        })) ,
        genres: elemento.genres.map( el => ({
            name: el.name,

        })),
        released: elemento.released
      };
      return cleanedGame;
    });
  };
  
  const gamesFromApi = async () => {
    const pages = [1, 2, 3, 4, 5];
    const promises = pages.map(page => (
      axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=${page}&page_size=20`)
    ));
  
    const resultado = await Promise.all(promises);
    const resulta2labeta = resultado.flatMap(res => res.data.results);
  
    const juegosFiltrados = await cleanArray(resulta2labeta);
    return juegosFiltrados;
  };

  const gamesFromDb = async () => await Videogame.findAll()

  const getAllGames = async  () => {
    const fromdb = await gamesFromDb();
    const fromapi = await gamesFromApi()

    const allgames = [...fromdb, ...fromapi]
    return allgames
}

const searchGameByName = async (name) => {
    const allGames= await getAllGames()
    const filteredGames = allGames.filter( el => name === el.name)
    if (filteredGames.length===0){ return {message: "user not found"}}
    return filteredGames 
}

const searchById = async (id, source) => {
  console.log('Valor de id:', id);
if (source === 'api') {
    const juegoPorId = (await axios.get(`https://api.rawg.io/api/games/${id}?key=913a73bb06fc4cf4859c2f7535360305`)).data
    return juegoPorId
} else if( source === 'db'){
  try {
    if (!isUuid(id)) {
      throw new Error('Invalid UUID');
    }

    const juegoPorId = await Videogame.findByPk(id);

    if (!juegoPorId) {
      throw new Error('Game not found');
    }

    return juegoPorId.dataValues;
  } catch (error) {
    console.error('Error al buscar por id en la db:', error.message);
    throw new Error(`Error al buscar por id en la db: ${error.message}`);
  }
  // const formattedResult = juegoPorId.map(item => item.dataValues);
  // return formattedResult;
 
   
}
 
  // return juegoPorId[0]
}

// ID , nombre, descripcion, plataforma 
// controllers.js/videogamesControllers

const createGame = async (name) => {
  try {
    // Crear el nuevo juego únicamente con el nombre
    const newGame = await Videogame.create({
      name,
      // id: uuidv4(),
    });

    return newGame;
  } catch (error) {
    console.error('Error al crear el juego:', error.message);
    throw new Error(`Error al crear el juego: ${error.message}`);
  }
};


module.exports = {createGame,
getAllGames,
    searchGameByName,
    searchById
} 