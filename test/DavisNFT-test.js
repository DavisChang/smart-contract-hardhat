const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("DavisNFT Contract", () => {
  const name = 'DavisNFT';
  const symbol = 'DNFT'
  let DavisNFT, davisNFT, owner, addr1, addr2;

  beforeEach(async () => {
    DavisNFT = await ethers.getContractFactory(name);
    davisNFT = await DavisNFT.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await davisNFT.owner()).to.equal(owner.address);
      expect(await davisNFT.name()).to.equal(name);
      expect(await davisNFT.symbol()).to.equal(symbol);
    });
    it("Check name and equal ", async () => {
      expect(await davisNFT.name()).to.equal(name);
      expect(await davisNFT.symbol()).to.equal(symbol);
    });
  });

  describe("Mint NFT", () => {
    it("Should not mint NFT before isPublicMintEnabled is false", async () => {
      expect(await davisNFT.isPublicMintEnabled()).to.equal(false);
      await expect(davisNFT.connect(addr1).mint(1)).to.be.revertedWith('Minting not enabled');
      expect(await davisNFT.totalSupply()).to.equal(0);
    });

    it("Should mint NFT", async () => {
      const mintPrice = await davisNFT.mintPrice();
      await davisNFT.setIsPublicMintEnable(true);
      const tx = await davisNFT.connect(addr2).mint(1, { value: mintPrice })
      await tx.wait();
      expect(await davisNFT.connect(addr2).totalSupply()).to.equal(1);
      expect(await davisNFT.connect(addr2).ownerOf('1')).to.equal(addr2.address);
    });

    it("Should mint NFT failed if mint value was wrong", async () => {
      const mintPrice = await davisNFT.mintPrice();
      await davisNFT.setIsPublicMintEnable(true);
      await expect(davisNFT.connect(addr2).mint(1, { value: mintPrice.add(1) }))
        .to.be.revertedWith('Wrong mint value');
    });

    it("Should not mint more than maxPerWallet NFT", async () => {
      const maxPerWallet = await davisNFT.maxPerWallet();
      const mintPrice = await davisNFT.mintPrice();
      await davisNFT.setIsPublicMintEnable(true);
      await expect(
        davisNFT.connect(addr2).mint(
          maxPerWallet.add(1),
          { value: mintPrice.mul(maxPerWallet.add(1)) }
        )
      ).to.be.revertedWith('Exceed max wallet');
    });
  });

  describe("Withdraw Ether", () => {
    it("Should retrive all funding by contract owner", async () => {
      const mintPrice = await davisNFT.mintPrice();
      await davisNFT.setIsPublicMintEnable(true);
      await davisNFT.connect(addr1).mint(1, { value: mintPrice });
      await davisNFT.connect(addr2).mint(1, { value: mintPrice });
      await expect(davisNFT.connect(addr2).withdraw())
        .to.be.revertedWith('Ownable: caller is not the owner');

      const contractBalance = await davisNFT.provider.getBalance(davisNFT.address);
      const beforeOwnerBalance = await owner.getBalance();
      
      await davisNFT.connect(owner).withdraw();

      expect(contractBalance).to.equal(mintPrice.mul(2));
      expect(ethers.utils.formatEther((await owner.getBalance() - beforeOwnerBalance).toString()))
      assert.isAbove(
        Number(ethers.utils.formatUnits((await owner.getBalance() - beforeOwnerBalance).toString())),
        Number(ethers.utils.formatUnits(mintPrice)),
        'Owner balance should greater then 0.02'
      )
    });
  });

});
