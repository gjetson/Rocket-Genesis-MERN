const RegionController = require('../controllers/region/region-controller')
const { isAuth } = require('../utils/auth')

const registerRegionRoutes = (app) => {
    app.post('/region-create', RegionController.createRegion)
    app.get('/region/:region', RegionController.getRegions)
    app.get('/all-stars', RegionController.getAllStars)
}

module.exports = { registerRegionRoutes }