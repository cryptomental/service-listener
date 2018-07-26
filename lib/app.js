const _ = require('lodash')
const ConnectionHandler = require('./app/connectionHandler')
const Logger = require('./utils/logger')
const PROVIDER = process.env.PROVIDER || 'http://localhost:9545'
const MarketInterface = require('./app/marketInterface')

let conn = new ConnectionHandler(PROVIDER)
let market = new MarketInterface(conn)

// Wait - this will be replaced by forever
setTimeout(_.noop, 5000000)
