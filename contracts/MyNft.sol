// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNft is ERC721URIStorage{
    uint256 private s_tokenCounter;
    uint private amount;
    uint256 private burned;

    constructor() ERC721("YourNft", "YN") {
         s_tokenCounter = 0;
         
    }

    function mintNft (uint256 burnedToken) public returns(uint256,uint256) {   
        string memory tokenURI = "bafybeig27ros3pems4tji7azvwh2t72oc7fd2phdohviafadi26efmqoeu";
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, tokenURI);
        s_tokenCounter = s_tokenCounter + 1;
        burned = burnedToken;
        return (s_tokenCounter,burned);
    }

     function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getburnedToken() public view returns (uint256) {
        return burned;
    }


    
}