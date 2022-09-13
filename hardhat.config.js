require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        
    },
  },
};
