const requireContractAbi = (contractName, truffle = false) => {
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

module.exports = {
  live: {
    MarketCollateralPoolFactory: requireContractAbi("MarketCollateralPoolFactory"),
    MarketContractFactory: requireContractAbi("MarketContractFactory"),
    MarketContractRegistry: requireContractAbi("MarketContractRegistry"),
    MarketToken: requireContractAbi("MarketToken"),
    MathLib: requireContractAbi("MathLib"),
    OrderLib: requireContractAbi("OrderLib")
  },
  truffle: {
    MarketCollateralPoolFactory: requireContractAbi("MarketCollateralPoolFactory", true),
    MarketContractFactory: requireContractAbi("MarketContractFactory", true),
    MarketContractRegistry: requireContractAbi("MarketContractRegistry", true),
    MarketToken: requireContractAbi("MarketToken", true),
    MathLib: requireContractAbi("MathLib", true),
    OrderLib: requireContractAbi("OrderLib", true)
  }
}
