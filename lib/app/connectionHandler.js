const _ = require('lodash')
const ABI = require('../utils/abi')
const Logger = require('../utils/logger')
const Web3 = require('web3')

module.exports = class ConnectionHandler {
  constructor(providerURI) {
    this.__internal__ = {
      providerURI: undefined
    }
    this.web3 = new Web3()
    this.provider = providerURI
  }

  // Getters
  get connected() {
    return this.isConnected()
  }

  get networkId() {
    return new Promise((resolve, reject) => {
      this.web3.version.getNetwork((error, networkId) => {
        if(error) {
          Logger.error(error)
          reject(error)
        } else {
          resolve(networkId)
        }
      })
    })
  }

  get provider() {
    return this.web3.currentProvider
  }

  // Setters
  set provider(providerURI) {
    this.__internal__.providerURI = providerURI
    this.setWeb3Provider()
    return this.isConnected()
  }

  // Instance Methods

  isConnected() {
    try {
      if(this.web3.isConnected()) {
        Logger.log(`Connected to ${this.__internal__.providerURI}`)
        return true
      } else {
        Logger.warn(`Unable to connect to ${this.__internal__.providerURI}`)
        return false
      }
    } catch(e) {
      Logger.warn(`Unable to connect to ${this.__internal__.providerURI}`)
      return false
    }
  }

  setWeb3Provider() {
    this.web3.setProvider(new this.web3.providers.HttpProvider(this.__internal__.providerURI))
  }
}
