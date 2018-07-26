const Logger = require('../utils/logger')
const Web3 = require('web3')

module.exports = class ConnectionHandler {
  constructor(providerURI) {
    this.web3 = new Web3()
    this.provider = providerURI
  }

  // Getters
  get connected() {
    return this.isConnected()
  }

  get provider() {
    return this.providerURI
  }

  // Setters
  set provider(providerURI) {
    this.providerURI = providerURI
    this.setWeb3Provider()
    return this.isConnected()
  }

  // Instance Methods

  isConnected() {
    try {
      if(this.web3.eth.gasPrice) {
        Logger.log(`Connected to ${this.providerURI}`)
        return true
      } else {
        Logger.warn(`Unable to connect to ${this.providerURI}`)
        return false
      }
    } catch(e) {
      Logger.warn(`Unable to connect to ${this.providerURI}`)
      return false
    }
  }

  setWeb3Provider() {
    this.web3.setProvider(new this.web3.providers.HttpProvider(this.providerURI))
  }
}
