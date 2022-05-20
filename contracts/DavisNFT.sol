// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DavisNFT is ERC721, Ownable {
  uint256 public mintPrice;   // storage variable (cost come from) 
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnabled;
  string internal baseTokenUri;
  address public withdrawWallet;
  mapping(address => uint256) public walletMints;   // tracking mint wallet

  constructor() payable ERC721('DavisNFT', 'DNFT') {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    withdrawWallet = msg.sender;
  }

  function setIsPublicMintEnable(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
    baseTokenUri = _baseTokenUri;
  }

  // display in opensea
  function tokenURI(uint256 _tokenId) public view override returns(string memory) {
    require(_exists(_tokenId), 'Token does not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), '.json'));
  }

  function withdraw() external onlyOwner {
    (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');  // low level func
    require(success, 'withdraw failed');  // fail check, and it's going to revert
  }

  // key point
  function mint(uint256 _quantity) public payable {
    require(isPublicMintEnabled, 'Minting not enabled');
    require(msg.value == _quantity * mintPrice, 'Wrong mint value');
    require(totalSupply + _quantity <= maxSupply, 'Sold out');
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Exceed max wallet');

    // azuki nft improve gas costs this below
    for (uint256 i = 0; i < _quantity; i++) {
      uint256 newTokenId = totalSupply + 1;
      totalSupply++;
      _safeMint(msg.sender, newTokenId);
    }
  }
}