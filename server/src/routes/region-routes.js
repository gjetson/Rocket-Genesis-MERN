const RegionController = require('../features/region/region-controller')
const { isAuth } = require('../utils/auth')

const registerRegionRoutes = (app) => {
    app.post('/region-create', isAuth, RegionController.createRegion)
    app.get('/region/:region', isAuth, RegionController.getRegions)
    app.get('/all-stars', isAuth, RegionController.getAllStars)
}

module.exports = { registerRegionRoutes }