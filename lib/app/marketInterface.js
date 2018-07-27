const _ = require('lodash')
const getContractAddress = require('../utils/getContractAddress')
const Logger = require('../utils/logger')
const Market = require('@marketprotocol/marketjs').Market

// Private Functions
const reset = (marketInterface) => {
  clearTimeout(_.get(marketInterface, '__internal__.onInitializePid'))

  marketInterface.__internal__ = {
    listeners: {},
    connection: undefined,
    marketjs: undefined,
    onInitializePid: undefined,
    onInitializeQueue: []
  }
}

// Export
module.exports = class MarketInterface {
  constructor(conn, callback) {
    reset(this)
    this.connection = conn
    this.handleEvent = this.handleEvent.bind(this)
    this.onInitialize = this.onInitialize.bind(this)
    this.subscribeToEvents = this.subscribeToEvents.bind(this)

    if(_.isFunction(callback)) {
      this.onInitialize(callback)
    }
  }

  // Getters
  get connected() {
    return this.connection.connected
  }

  get connection() {
    return this.__internal__.connection
  }

  get contract() {
    return this.__internal__.contract
  }

  get initialized() {
    return !!this.__internal__.marketjs
  }

  get marketjs() {
    return this.__internal__.marketjs
  }

  // Setters
  set connection(conn) {
    this.stopListening()
    reset(this)

    return new Promise((resolve, reject) => {
      conn.networkId.then((networkId) => {
        this.__internal__.connection = conn

        let marketCollateralPoolFactoryAddress =
          getContractAddress("MarketCollateralPoolFactory", networkId)
        let marketContractFactoryAddress = getContractAddress("MarketContractFactory", networkId)
        let marketContractRegistryAddress = getContractAddress("MarketContractRegistry", networkId)
        let marketTokenAddress = getContractAddress("MarketToken", networkId)
        let mathLibAddress = getContractAddress("MathLib", networkId)
        let orderLibAddress = getContractAddress("OrderLib", networkId)

        this.__internal__.marketjs = new Market(
          conn.provider,
          {
            marketCollateralPoolFactoryAddress,
            marketContractFactoryAddress,
            marketContractRegistryAddress,
            marketTokenAddress,
            mathLibAddress,
            orderLibAddress,
            networkId
          }
        )

        this.startListening()
        resolve(this.connection)
      }).catch(reject)
    })
  }

  // Instance Methods
  handleEvent(error, evt) {
    if(error) {
      Logger.error(`Caught an event error for contract ${contractName}`)
      Logger.error(error)
    } else {
      Logger.log(`Saw an event for ${contractName}`)
      Logger.log(evt)
    }
  }

  listen(eventName, callback) {
    if(!this.__internal__.listeners[eventName]) {
      this.__internal__.listeners[eventName] = []
    }

    if(_.isFunction(callback)) {
      this.__internal__.listeners[eventName].push(callback)
    }
  }

  onInitialize(callback) {
    clearTimeout(this.__internal__.onInitializePid)

    if(_.isFunction(callback)) {
      this.__internal__.onInitializeQueue.push(callback)
    }

    if(this.initialized) {
      while(func = this.__internal__.onInitializeQueue.pop()) { func(this) }
    } else {
      this.__internal__.onInitializePid = setTimeout(this.onInitialize, 100)
    }
  }

  startListening() {
    _.forEach(_.keys(this.marketjs), this.subscribeToEvents)
  }

  stopListening() {
    // TODO: Stop things here
    // this.__internal__.listeners = {}
  }

  subscribeToEvents(registryName) {
    let registry = this.marketjs[registryName]
    if(registry && registry.rawWeb3Contract) {
      registry.rawWeb3Contract.allEvents(this.handleEvent)
      Logger.log(`Subscribed to all events for ${registryName}`)
    }
  }
}
