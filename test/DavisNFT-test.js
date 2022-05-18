const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DavisNFT Contract", () => {
  let DavisNFT, davisNFT, owner, addr1, addr2;

  beforeEach(async () => {
    DavisNFT = await ethers.getContractFactory("DavisNFT");
    davisNFT = await DavisNFT.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await davisNFT.owner()).to.equal(owner.address);
    });
  });
});
