const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  
  const [deployer, user, user2] = await ethers.getSigners(); 

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

  //burn user
  const burnTransaction = await mytoken.connect(user).burn(ethers.utils.parseEther("100.0"))
  burnTransaction.wait();
  console.log("100 Token burned"); 
  console.log("Minting Nft...");
  
  const tokenURI = await mynft.tokenURI(0);
  console.log("User TokenURI is: ",tokenURI);

  console.log("------------------------------------------------------------------------------------------------");
  //User2
  console.log('address of user2: ', user2.address)
  await user2.sendTransaction({
    to: mytoken.address,
    value: ethers.utils.parseEther("1.0"),
  });

  const burnTransaction2 = await mytoken.connect(user2).burn(ethers.utils.parseEther("80.0"))
  burnTransaction2.wait();
  console.log("80 Token burned"); 
  console.log("Minting Nft...");
  
  const tokenURI2 = await mynft.tokenURI(1);
  console.log("User TokenURI is: ",tokenURI2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
