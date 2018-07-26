const _ = require('lodash')
const ABI = require('../utils/abi')
const Constants = require('../config/constants')

module.exports = (contractName, networkId) => {
  let base = networkId === "4447" ? "truffle" : "live"
  let abi = _.get(ABI, [base, contractName])

  if (_.has(abi, ['networks', networkId])) {
    return _.get(abi, ['networks', networkId])
  } else {
    return Constants.NULL_ADDRESS
  }
}
