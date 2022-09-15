// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

interface IMyNft {
   function mintNft(uint newamount) external returns(uint256,uint);
}

contract MyToken is ERC20Burnable {

    IMyNft nftContract;

    constructor() ERC20("MyToken", "MT") { }

    function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        // call mint nft
    }

    function setNftContractAddress(IMyNft addr) public { // onlyOwner
        nftContract = addr;
    }

    function callMintNft(uint256 amount) internal {
        nftContract.mintNft(amount);
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
