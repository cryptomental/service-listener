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

Now you can run the listener:

```
npm start
```

## Other Networks

You can set the `PROVIDER` env variable to connect to a different node.

## NPM scripts

 - `npm test`: Run test suite
 - `npm start`: Run the listener
