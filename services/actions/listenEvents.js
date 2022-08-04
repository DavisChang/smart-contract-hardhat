const ethers = require("ethers")
const { abi } = require("../../abi/dcToken.json")
require("dotenv").config()

async function main() {
  console.log('listen events')
  const contractAddress = '0xCeA78FC5Ac1F910768A6A844bF98F161eEDA1142'
  const provider = new ethers.providers.WebSocketProvider(
    `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  )
  const contract = new ethers.Contract(contractAddress, abi, provider)
  contract.on('Transfer', (from, to, value, event) => {
    const info = {
      from,
      to,
      value: ethers.utils.formatUnits(value, 18),
      data: event
    }
    console.log('[Event]: ', JSON.stringify(info, null, 4))
  })
}

main();