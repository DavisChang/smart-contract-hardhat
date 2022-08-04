const ethers = require("ethers")
const { abi } = require("../../abi/dcToken.json")
require("dotenv").config()

async function main() {
  const account = '0x66A178637c041bc78C543c421D7376A22E611827'
  console.log(`Account ${account}`)

  const contractAddress = '0xCeA78FC5Ac1F910768A6A844bF98F161eEDA1142'
  const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`)
  const contract = new ethers.Contract(contractAddress, abi, provider)
  console.log(`\nContract Address ${contractAddress}`)


  const block = await provider.getBlockNumber()
  console.log(`\nBlock Number: ${block}\n`)

  // Get contract Transfer events
  const transferEvents = await contract.queryFilter('Transfer', 0, block)
  console.log('\nTransfer count:', transferEvents.length)
  transferEvents.forEach(trans => {
    if (trans.args.from === account) {
      console.log('\nto: ', trans.args.to, ', value: ', ethers.utils.formatUnits(trans.args.value, 18))
    }
    
  })

  // Etherscan Provider
  const etherscanProvider = new ethers.providers.EtherscanProvider('rinkeby', process.env.ETHERSCAN_API_KEY)
  etherscanProviderinherits.getHistory(account).then((history) => {
    history.forEach((tx) => {
        console.log('\nGet Transaction History:', tx);
    })
  });
}

main();