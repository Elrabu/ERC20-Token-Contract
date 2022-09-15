require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: "kite fat expand gun blue frown fun wash avocado jaguar grid bring"
      }
    }
  },
  solidity: "0.8.16",

  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
       
    }
  },
};
