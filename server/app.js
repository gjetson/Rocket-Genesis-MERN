// Initial dependencies and definitions
const Express = require('express')
const MongoManager = require('./src/shared/db/mongodb/mongo-manager')
const cors = require("cors")

require('dotenv').config()
//console.log(process.env)

const app = Express()
const port = process.env.PORT || 3004

// import routes
const HealthRoutes = require('./src/routes/health.routes')
const AgentRoutes = require('./src/routes/agent-routes')
const RegionRoutes = require('./src/routes/region-routes')
const UserRoutes = require('./src/routes/user-routes')


const { setActive } = require('./src/utils/auth')
setActive(process.env)

app.use(cors())
app.use(Express.json())

const { initLogger } = require('./src/utils/logger')
initLogger(app, process.env)

HealthRoutes.registerHealthRoutes(app)
AgentRoutes.registerAgentRoutes(app)
RegionRoutes.registerRegionRoutes(app)
UserRoutes.registerUserRoutes(app)

MongoManager.openMongoConnection(process.env.MONGO_URI)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})