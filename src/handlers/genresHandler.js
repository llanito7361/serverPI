const {getGenders}= require('../controllers.js/genresControllers')

const getGenresHandler = async (req,res ) => {
    try {
        let generos = await getGenders()
    res.status(200).send(generos)
    } catch (error) {
    res.status(400).send(error.message)        
    }
}

module.exports = {getGenresHandler};