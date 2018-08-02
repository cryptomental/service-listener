import { DEFAULT_PROVIDER } from './config/constants'
import { noop } from 'lodash'

import ConnectionHandler from './app/connectionHandler'
import Logger from './utils/logger'
import MarketInterface from './app/marketInterface'

const PROVIDER: string = process.env.PROVIDER || DEFAULT_PROVIDER

let conn = new ConnectionHandler(PROVIDER)
let market = new MarketInterface(conn)

// Wait - this will be replaced by forever
setTimeout(noop, 5000000)
