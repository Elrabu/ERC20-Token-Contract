require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    ganache: {
      url: "http://172.27.240.1:7545",
      accounts: {
        mnemonic: "pitch target eagle talk year frame rather view witness surround vote short"
      }
    }
  },
  solidity: "0.8.17",

  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
       
    }
  },
};
