import { MARKET } from '../config/constants'

const requireContractAbi = (contractName: string, truffle: boolean = false) => {
  let base;

  if (contractName === "MarketContractFactory") {
    contractName = "MarketContractFactoryOraclize"
  }

  if (truffle) {
    // Truffle
    base = '../../build/contracts'
  } else {
    // Live
    base = '@marketprotocol/abis/build/contracts'
  }

  return require(`${base}/${contractName}`)
}

export default {
  live: {
    MarketCollateralPoolFactory: requireContractAbi(MARKET.COLLATERAL_POOL_FACTORY),
    MarketContractFactory: requireContractAbi(MARKET.CONTRACT_FACTORY),
    MarketContractRegistry: requireContractAbi(MARKET.CONTRACT_REGISTRY),
    MarketToken: requireContractAbi(MARKET.TOKEN),
    MathLib: requireContractAbi(MARKET.MATH_LIB),
    OrderLib: requireContractAbi(MARKET.ORDER_LIB)
  },
  truffle: {
    MarketCollateralPoolFactory: requireContractAbi(MARKET.COLLATERAL_POOL_FACTORY, true),
    MarketContractFactory: requireContractAbi(MARKET.CONTRACT_FACTORY, true),
    MarketContractRegistry: requireContractAbi(MARKET.CONTRACT_REGISTRY, true),
    MarketToken: requireContractAbi(MARKET.TOKEN, true),
    MathLib: requireContractAbi(MARKET.MATH_LIB, true),
    OrderLib: requireContractAbi(MARKET.ORDER_LIB, true)
  }
}
