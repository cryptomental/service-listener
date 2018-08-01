import { MARKET } from '../config/constants'

import { forEach, get, isFunction, keys } from 'lodash'
import ConnectionHandler from './connectionHandler'
import getContractAddress from '../utils/getContractAddress'
import Logger from '../utils/logger'
import { Market } from '@marketprotocol/marketjs'

const {
  COLLATERAL_POOL_FACTORY,
  CONTRACT_FACTORY,
  CONTRACT_REGISTRY,
  MATH_LIB,
  ORDER_LIB,
  TOKEN
} = MARKET

interface Listeners {
  [propName: string]: Array<(propName: any) => void>
}

class Internal {
  public connection: ConnectionHandler
  public listeners: Listeners
  public marketjs: Market
  public onInitializePid: NodeJS.Timer
  public onInitializeQueue: Array<any>

  constructor() {
    this.listeners = {}
    this.onInitializeQueue = []
  }
}

class MarketInterface {
  private __internal__: Internal

  constructor(conn, callback?) {
    this.reset()
    this.connection = conn
    this.handleEvent = this.handleEvent.bind(this)
    this.onInitialize = this.onInitialize.bind(this)
    this.subscribeToEvents = this.subscribeToEvents.bind(this)

    if(isFunction(callback)) {
      this.onInitialize(callback)
    }
  }

  // Getters
  get connected(): boolean {
    return this.connection.connected
  }

  get connection(): ConnectionHandler {
    return this.__internal__.connection
  }

  get initialized(): boolean {
    return !!this.__internal__.marketjs
  }

  get marketjs(): Market {
    return this.__internal__.marketjs
  }

  // Setters
  set connection(conn: ConnectionHandler) {
    this.stopListening()
    this.reset()

    conn.networkId.then((networkId: string) => {
      this.__internal__.connection = conn

      let marketCollateralPoolFactoryAddress: string
      let marketContractFactoryAddress: string
      let marketContractRegistryAddress: string
      let marketTokenAddress: string
      let mathLibAddress: string
      let orderLibAddress: string

      marketCollateralPoolFactoryAddress = getContractAddress(COLLATERAL_POOL_FACTORY, networkId)
      marketContractFactoryAddress = getContractAddress(CONTRACT_FACTORY, networkId)
      marketContractRegistryAddress = getContractAddress(CONTRACT_REGISTRY, networkId)
      marketTokenAddress = getContractAddress(TOKEN, networkId)
      mathLibAddress = getContractAddress(MATH_LIB, networkId)
      orderLibAddress = getContractAddress(ORDER_LIB, networkId)

      this.__internal__.marketjs = new Market(
        conn.currentProvider,
        {
          marketCollateralPoolFactoryAddress,
          marketContractFactoryAddress,
          marketContractRegistryAddress,
          marketTokenAddress,
          mathLibAddress,
          orderLibAddress,
          networkId: parseInt(networkId)
        }
      )

      this.startListening()
    })
  }

  // Instance Methods
  // NOTE: I'm not yet sure what an evt is. Haven't been able to fire one....
  private handleEvent(error: any, evt: any): void {
    if(error) {
      Logger.error(`Caught an event error for contract`)
      Logger.error(error)
    } else {
      Logger.log(`Saw an event`)
      Logger.log(evt)
    }
  }

  public listen(eventName: string, callback: any): void {
    if(!this.__internal__.listeners[eventName]) {
      this.__internal__.listeners[eventName] = []
    }

    if(isFunction(callback)) {
      this.__internal__.listeners[eventName].push(callback)
    }
  }

  public onInitialize(callback: any): void {
    clearTimeout(this.__internal__.onInitializePid)
    if(isFunction(callback)) {
      this.__internal__.onInitializeQueue.push(callback)
    }

    if(this.initialized) {
      let func: any;
      while(func = this.__internal__.onInitializeQueue.pop()) { func(this) }
    } else {
      this.__internal__.onInitializePid = setTimeout(this.onInitialize, 100)
    }
  }

  private reset(): void {
    clearTimeout(get(this, '__internal__.onInitializePid'))
    this.__internal__ = new Internal()
  }

  private startListening(): void {
    forEach(keys(this.marketjs), this.subscribeToEvents)
  }

  private stopListening(): void {
    // TODO: Stop things here
    // this.__internal__.listeners = {}
  }

  public subscribeToEvents(registryName: string): void {
    let registry = this.marketjs[registryName]
    if(registry && registry.rawWeb3Contract) {
      registry.rawWeb3Contract.allEvents().watch(this.handleEvent)
      Logger.log(`Subscribed to all events for ${registryName}`)
    }
  }
}

export default MarketInterface
