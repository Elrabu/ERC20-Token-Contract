require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    ganache: {
      url: "HTTP://172.27.240.1:7545",
      accounts: {
        mnemonic: "over galaxy middle face grain index link boring sun sound leave music"
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
