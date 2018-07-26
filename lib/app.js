const ConnectionHandler = require('./app/connectionHandler')
const PROVIDER = process.env.PROVIDER || 'http://localhost:9545'
const MarketInterface = require('./app/marketInterface')

let conn = new ConnectionHandler(PROVIDER)
let market = new MarketInterface(conn)

