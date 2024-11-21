
const axios = require('axios')
const {Genre, apikey} = require('../db')



const getGendersFromApi = async () => {
    const pedido = (await axios.get(`https://api.rawg.io/api/genres?key=${apikey}`)).data
    const genresApi = await pedido.results.map(genre => ({name :genre.name}))  // [ {} ,{} ,{} ,  ] // devuelve un array de objetos {name: ''}
    // const genresApi = await pedido.results.map(p => p.name) // devuelve un array de strings ['genre1', 'genre2', 'genre3']

//el q fetchea
for (const p of genresApi) {
    await Genre.findOrCreate({
        where: {name: p.name}
    })
}

}

const getGenders = async () => {
    await getGendersFromApi()
    return await Genre.findAll()
}


module.exports = { getGenders}