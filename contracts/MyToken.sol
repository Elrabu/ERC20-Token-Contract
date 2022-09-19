// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

interface IMyNft {
   function mintNft(uint256 burnedToken, address receiver) external returns(uint256,uint256);
}

contract MyToken is ERC20Burnable{

    IMyNft nftContract;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
        }

    constructor() ERC20("MyToken", "MT") {
        owner = msg.sender;
     }

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        nftContract.mintNft(amount,account);
    }

    function setNftContractAddress(IMyNft addr) public  onlyOwner{ 
        nftContract = addr;
    }

   
    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        if (msg.value == 1 ether) {
            _mint(msg.sender, 1000 * (10**18));
        } else {
            revert("more or less than 1 ether");
        }
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
             
}
