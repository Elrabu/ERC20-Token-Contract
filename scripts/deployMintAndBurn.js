const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners(); 

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.connect(deployer).deploy()
  await mytoken.deployed(); 
  console.log(`MyToken deployed to ${mytoken.address} for 1 Ether`); 
  console.log("------------------------------------------------------------------------------------------------");

  // Deploy the Nft Contract and mint your Nft:
  const Nft = await hre.ethers.getContractFactory("MyNft");
  const mynft = await Nft.connect(deployer).deploy()
  await mynft.deployed();
  console.log(`MyNft deployed to ${mynft.address}`);


  // Set the address of NFT contract in Token Contract
  await mytoken.connect(deployer).setNftContractAddress(mynft.address)


  console.log('address of user: ', user.address)
  await user.sendTransaction({
    to: mytoken.address,
    value: ethers.utils.parseEther("1.0"), 
  });
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
