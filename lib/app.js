const Web3 = require('web3')
const PROVIDER = process.env.PROVIDER || 'http://localhost:9545'

let web3 = new Web3()

web3.setProvider(new web3.providers.HttpProvider(PROVIDER))

try {
  if(web3.eth.coinbase) {
    console.log(`Connected to ${PROVIDER}`)
  }
} catch(e) {
  console.error(`Unable to connect to ${PROVIDER}`)
}
