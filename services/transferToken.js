const ethers = require("ethers")
const { abi } = require("../../abi/dcToken.json")
require("dotenv").config()

async function main() {
  const reciever = '0x44F18A3184B33557a1E672C74bD3471F36901312'
  const amountOfToken = '10'
  console.log(`Transfer ${amountOfToken} tokens to ${reciever}`)
  
  const contractAddress = '0xCeA78FC5Ac1F910768A6A844bF98F161eEDA1142'
  const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`)

  const accountPrivateKey = process.env.ACCOUNT_DEPLOY_PRIVATE_KEY
  const account = '0x66A178637c041bc78C543c421D7376A22E611827'
  const wallet = new ethers.Wallet(accountPrivateKey, provider)
  const contract = new ethers.Contract(contractAddress, abi, provider)

  const balance = await contract.balanceOf(account)
  const tokenAmount = ethers.utils.formatUnits(balance, 18);

  console.log(`\nReading from TOKEN contract ${contractAddress}\n`)
  console.log(`Balance of sender: ${balance} (${account})\n`)
  console.log(`Transfer amount of tokens: ${tokenAmount}\n`)

  const amount = ethers.utils.parseUnits(amountOfToken)
  const contractWithWallet = contract.connect(wallet)
  const tx = await contractWithWallet.transfer(reciever, amount)
  await tx.wait()

  console.log('\nTransfer log: ', tx)

  const balanceOfSender = await contract.balanceOf(account)
  const balanceOfReciever = await contract.balanceOf(reciever)

  console.log(`\nBalance of sender: ${ethers.utils.formatUnits(balanceOfSender, 18)} (${account})`)
  console.log(`Balance of reciever: ${ethers.utils.formatUnits(balanceOfReciever, 18)} (${reciever})\n`)
}

main();