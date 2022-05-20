# smart-contract-hardhat
Using React, Hardhat, Ethers, and Chakra to create a Web3 Mint website.

## Basic Sample Hardhat Project 
You need to add .env file for this project

```.env
RINKEBY_RPC_URL='infura rinkeby network RPC url'
ETHERSCAN_API_KEY='etherscan api key'
ACCOUNT_DEPLOY_PRIVATE_KEY='your account private key'
REPORT_GAS=true
```

Try running some of the following tasks:
```shell
npx hardhat accounts                                           // lists the available accounts
npx hardhat compile                                            // compile contract
npx hardhat clean                                              // clear the cache and delete all artifacts
npx hardhat test                                               // test contract
npx hardhat run scripts/contract-test.js --network rinkeby     // test contract on other networks
npx hardhat node                                               // run local private network
npx hardhat run scripts/deployDavisNFT.js --network localhost  // deploy to local network
npx hardhat console --network localhost                        // you can test contract on console
npx hardhat run scripts/deployDavisNFT.js --network rinkeby    // deploy to rinkeby network
npx hardhat verify --network rinkeby ${contract_address}       // verify contract
```

## Other sources

* [ethers.js](https://github.com/ethers-io/ethers.js) - A complete Ethereum wallet implementation and utilities in JavaScript
* [Infura](https://infura.io/) - Create RPC URL
* [Etherscan](https://etherscan.io/) - Create API Key
  1. [Rinkeby](https://rinkeby.etherscan.io/) - Find your contract
  2. Sample Address - 0x55E20Cbf55c8d8aB088853bAF426206d51a1AA0a
  3. [Etherscan Contract Info](https://rinkeby.etherscan.io/address/0x55E20Cbf55c8d8aB088853bAF426206d51a1AA0a)
* [Ethers - ethers.js](https://github.com/ethers-io/ethers.js)
