// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNft is ERC721URIStorage{
    uint256 private s_tokenCounter;
    uint private amount;
    address immutable erc20OwnerContract;
    

    constructor(address _erc20OwnerContract) ERC721("YourNft", "YN") {
         s_tokenCounter = 0;
         erc20OwnerContract = _erc20OwnerContract;
    }

    function mintNft (uint256 burnedToken,address receiver) public returns(uint256,uint256) {   
         require(msg.sender == erc20OwnerContract);
         string memory tokenURI = "bafybeig27ros3pems4tji7azvwh2t72oc7fd2phdohviafadi26efmqoeu";
         string memory tokenURI2 = "bafkreih6j2bs2uokr66rdlh2ti4otdyjagmpnnvqmhmtyz4cv32vfhcqm4";
        _safeMint(receiver, s_tokenCounter);
        if(burnedToken >= 100*10**18) {
            _setTokenURI(s_tokenCounter, tokenURI);
        } else {
             _setTokenURI(s_tokenCounter, tokenURI2); //dynamic tokeURI
        }
        
        s_tokenCounter = s_tokenCounter + 1;
       
        return (s_tokenCounter,burnedToken);
    }

     function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }


}