const MarketContractRegistry =
  require('@marketprotocol/abis/build/contracts/MarketContractRegistry')


module.exports = class MarketInterface {
  constructor(conn) {
    this.__internal__ = {
      listeners: [],
      connection: undefined,
      contract: undefined
    }
    this.connection = conn
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

  // Setters
  set connection(conn) {
    this.__internal__.connection = conn
    this.__internal__.contract = conn.fetchContract(MarketContractRegistry)
    return this.connection
  }

  // Instance Methods
  listen(event) {
    this.__internal__.listeners
  }
}
