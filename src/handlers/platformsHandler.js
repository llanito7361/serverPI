const {getPlatforms} = require('../controllers.js/platformsControllers')

const getPlatformsHandler = async (req,res) =>{
    try {
        const plataformas = await getPlatforms()
        res.status(200).send(plataformas)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {getPlatformsHandler};