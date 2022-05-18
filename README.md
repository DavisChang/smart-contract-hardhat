# smart-contract-hardhat
Using React, Hardhat, Ethers, and Chakra to create a Web3 Mint website.

## Basic Sample Hardhat Project 
You need to add .env file for this project

```.env
RINKEBY_RPC_URL='infura rinkeby network RPC url'
ETHERSCAN_API_KEY='etherscan api key'
ACCOUNT_DEPLOY_PRIVATE_KEY='your account private key'
```

Try running some of the following tasks:
```shell
npx hardhat accounts                                         // lists the available accounts
npx hardhat compile                                          // compile contract
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
npx hardhat run scripts/deployDavisNFT.js --network rinkeby  // deploy to rinkeby network
```

## Other sources

* [Infura](https://infura.io/) - Create RPC URL
* [Etherscan](https://etherscan.io/) - Create API Key
  1. [Rinkeby](https://rinkeby.etherscan.io/) - Find your contract
  2. Sample Address - 0x55E20Cbf55c8d8aB088853bAF426206d51a1AA0a
