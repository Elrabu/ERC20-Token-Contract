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
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/_Ce4aHCAY8M65LQ-p-JpyUuTro6ulcm3",
      accounts: ["63ac2ddc3b47b2a21db646a85e382ddc7ba0b3971588942ff5f4d2c6321451bc","f171c601064236bd289d83de9bdf49d56c474b7fcb22916678c2933fc84b28a3","edafd50c2a0b53c8373435b0e4849ef12a9612d7e317e80a165eafe523dec7a5"]

    }
  },
  solidity: "0.8.17",

  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
       
    }
  },
};
