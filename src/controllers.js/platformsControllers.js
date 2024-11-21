const axios = require('axios')
const {Platform, apikey} = require('../db')
const cleanArray = (array) => array.map(plataforma => ({name: plataforma.name}))

const platformsAPI = async ()=> {
    const plataformsApiRAW =  (await axios.get(`https://api.rawg.io/api/platforms?key=${apikey}`)).data.results
  
 const platformsApi = plataformsApiRAW.map(genre => ({name: genre.name}))

 for ( const p of platformsApi ) {
    await Platform.findOrCreate({
        where: {name : p.name}
    })
 }
}
const getPlatforms = async ()=>{
    await platformsAPI()
return await Platform.findAll()
    
    
}

module.exports = {getPlatforms}