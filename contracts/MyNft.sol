// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract MyNft is ERC721 {
    uint256 private s_tokenCounter;
    uint private amount;
    constructor() ERC721("YourNft", "YN") {
         s_tokenCounter = 0;
    }

    function mintNft(uint newamount) public returns(uint256,uint){
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        amount = newamount;
        return (s_tokenCounter,amount);
    }

     function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getAmount() public view returns (uint) {
        return amount;
    }

    
}