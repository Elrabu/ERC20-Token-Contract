// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyToken is ERC20, ERC20Burnable {
     uint constant _initial_supply = 100 * (10**18);
    constructor() ERC20("MyToken", "MT") {
        _mint(msg.sender, _initial_supply);
    }
}