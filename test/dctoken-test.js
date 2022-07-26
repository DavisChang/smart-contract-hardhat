const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('DC Token contract', () => {
  it('Deployment should assign the total supply of tokens to the owner', async () => {
    const name = 'DCToken'
    const [owner] = await ethers.getSigners()
    const Token = await ethers.getContractFactory(name)

    const hardhatToken = await Token.deploy()

    const ownerBalance = await hardhatToken.balanceOf(owner.address)
    const totalSupply = await hardhatToken.totalSupply()
    console.info({ ownerBalance, totalSupply })
    expect(totalSupply).to.equal(ownerBalance)
  })
})
