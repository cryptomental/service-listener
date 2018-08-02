import { get } from 'lodash'
import ABI from '../utils/abi'
import { NET, NULL_ADDRESS } from '../config/constants'

export default (contractName: string, networkId: string) => {
  let base = networkId === NET.TRUFFLE_ID ? "truffle" : "live"
  let abi = get(ABI, [base, contractName])

  return get(abi, ['networks', networkId, 'address'], NULL_ADDRESS)
}
