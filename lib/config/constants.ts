interface Market {
  COLLATERAL_POOL_FACTORY: string
  CONTRACT_FACTORY: string
  CONTRACT_REGISTRY: string
  MATH_LIB: string
  ORDER_LIB: string
  TOKEN: string
}

interface Net {
  RINKEBY_ID: string
  TRUFFLE_ID: string
}

export const DEFAULT_PROVIDER: string = 'http://localhost:9545'

export const MARKET: Market = {
  COLLATERAL_POOL_FACTORY: 'MarketCollateralPoolFactory',
  CONTRACT_FACTORY: 'MarketContractFactory',
  CONTRACT_REGISTRY: 'MarketContractRegistry',
  MATH_LIB: 'MathLib',
  ORDER_LIB: 'OrderLib',
  TOKEN: 'MarketToken'
}

export const NET: Net = {
  RINKEBY_ID: "4",
  TRUFFLE_ID: "4447"
}

export const NULL_ADDRESS: string = '0x0000000000000000000000000000000000000000'

export default { DEFAULT_PROVIDER, MARKET, NET, NULL_ADDRESS }
