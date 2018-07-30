import { Provider } from '@0xproject/types';
import Logger from '../utils/logger'
import Web3 from 'web3'

interface Internal {
  providerURI: string
}

class ConnectionHandler {
  private __internal__: Internal
  public web3: any

  constructor(providerURI: string) {
    this.__internal__ = { providerURI: "" }
    this.web3 = new Web3()
    this.provider = providerURI
  }

  // Getters
  get connected(): boolean {
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

  get currentProvider(): Provider {
    return this.web3.currentProvider
  }

  // Setters
  set provider(providerURI: string) {
    this.__internal__.providerURI = providerURI
    this.setWeb3Provider()
  }

  // Instance Methods

  public isConnected(): boolean {
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

  private setWeb3Provider(): void {
    this.web3.setProvider(new this.web3.providers.HttpProvider(this.__internal__.providerURI))
  }
}

export default ConnectionHandler
