<img src="https://github.com/MARKETProtocol/dApp/blob/master/src/img/MARKETProtocol-Light.png?raw=true" align="middle">

# service-listener

Listens for MARKET Protocol related events and stores that data for faster read access.

## Questions?

Join our [Discord Community](https://marketprotocol.io/discord) to get in touch with our dev staff and other contributors.

## Usage

A Makefile is provided for easy setup of the local development environment.

Some pre-requisites are required in order to utilize the Makefile.

NodeJS 8.11.2 LTS is recommended for compatibility.

```
$ git clone https://github.com/MARKETProtocol/MARKET.js  # clone this repository
$ git clone https://github.com/MARKETProtocol/ethereum-bridge.git # and the needed oraclize.it bridge (for local test rpc)
```

From here you will be able to use make commands assuming npm is already installed.

Assuming you have npm already, Install truffle
```
$ make install_truffle # may require sudo
```

Install needed dependencies.  If this fails on your ubuntu install it may require you to run `sudo apt-get install build-essential -y` prior to installing.
```
$ make install_deps
```
If you get an error on the `node-gyp rebuild` line during `make install_deps`, `node-gyp` doesn't support Python v3.x.x; v2.7 is recommended. There are several solutions based upon your platform.

The easiest solution?
```
make install_deps_python2.7
```
to use Python 2.7. See [stack overflow](https://stackoverflow.com/questions/20454199/how-to-use-a-different-version-of-python-during-npm-install) or the [npm node-gyp project](https://github.com/nodejs/node-gyp) for details.

You can start the truffle development environment and console
```
$ make start_console
```

Run the bridge
```
$ make start_bridge
cd ../ethereum-bridge ; node bridge -H localhost:9545 -a 9 --dev
Please wait...
[2018-07-26T21:52:31.406Z] WARN --dev mode active, contract myid checks and pending queries are skipped, use this only when testing, not in production
[2018-07-26T21:52:31.408Z] INFO you are running ethereum-bridge - version: 0.5.5
[2018-07-26T21:52:31.409Z] INFO saving logs to: ./bridge.log
[2018-07-26T21:52:31.410Z] INFO using active mode
[2018-07-26T21:52:31.411Z] INFO Connecting to eth node http://localhost:9545
[2018-07-26T21:52:32.965Z] INFO connected to node type EthereumJS TestRPC/v2.1.0-beta.7/ethereum-js
[2018-07-26T21:52:33.897Z] WARN Using 0x5aeda56215b167893e80b4fe645ba6d5bab767de to query contracts on your blockchain, make sure it is unlocked and do not use the same address to deploy your contracts
[2018-07-26T21:52:34.145Z] INFO deploying the oraclize connector contract...
[2018-07-26T21:52:45.222Z] INFO connector deployed to: 0xf7e3e47e06f1bddecb1b2f3a7f60b6b25fd2e233
[2018-07-26T21:52:45.843Z] INFO deploying the address resolver with a deterministic address...
[2018-07-26T21:53:08.909Z] INFO address resolver (OAR) deployed to: 0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475
[2018-07-26T21:53:08.910Z] INFO updating connector pricing...
[2018-07-26T21:53:21.324Z] INFO successfully deployed all contracts
[2018-07-26T21:53:21.331Z] INFO instance configuration file saved to /home/dan/local_code/bounties/marketprotocol/ethereum-bridge/config/instance/oracle_instance_20180726T175321.json

Please add this line to your contract constructor:

OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);

[2018-07-26T21:53:21.349Z] WARN re-org block listen is disabled
[2018-07-26T21:53:21.350Z] INFO Listening @ 0xf7e3e47e06f1bddecb1b2f3a7f60b6b25fd2e233 (Oraclize Connector)

(Ctrl+C to exit)

# Wait until you see all of these lines...
```

Run the truffle migrations
```
truffle(develop)> migrate --reset
```

*NOTE: You need to do this step even if you're going to use the rinkeby network.*


Install all of the required packages
```
npm install
```

Now you can run the listener
```
npm start
```

## Other Networks

You can set the `PROVIDER` env variable to connect to a different node.

## NPM scripts

 - `npm test`: Run test suite
 - `npm start`: Run the listener
