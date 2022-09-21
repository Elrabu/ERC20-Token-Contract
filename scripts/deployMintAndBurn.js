const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  
  const [deployer, user, user2] = await ethers.getSigners(); 

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.connect(deployer).deploy()
  await mytoken.deployed(); 
  console.log(`MyToken deployed to ${mytoken.address}`); 
  console.log("------------------------------------------------------------------------------------------------");

  // Deploy the Nft Contract and mint your Nft:
  const Nft = await hre.ethers.getContractFactory("MyNft");
  const mynft = await Nft.connect(deployer).deploy(mytoken.address)
  await mynft.deployed();
  console.log(`MyNft deployed to ${mynft.address}`);


  // Set the address of NFT contract in Token Contract
  await mytoken.connect(deployer).setNftContractAddress(mynft.address)

  console.log('address of user: ', user.address)
  const transactionSendEther = await user.sendTransaction({
    to: mytoken.address,
    from: user.address,
    value: ethers.BigNumber.from("10000000000000000"), // 0.01 ether
  });
  await transactionSendEther.wait(2);
  const balanceofUser1 = await mytoken.balanceOf(user.address);

  //burn user
  console.log("Balance:", balanceofUser1);
  const burnTransaction = await mytoken.connect(user).burn(ethers.BigNumber.from("100000000000000000000")) // 100 Tokens
  await burnTransaction.wait(2);
  console.log("100 Token burned"); 
  console.log("Minting Nft...");
  
  const tokenURI = await mynft.tokenURI(ethers.BigNumber.from("0"));
  console.log("User TokenURI is: ",tokenURI);

  console.log("------------------------------------------------------------------------------------------------");
  //User2
  console.log('address of user2: ', user2.address)
  const txSendEtherByUser2 = await user2.sendTransaction({
    to: mytoken.address,
    from: user2.address,
    value: ethers.BigNumber.from("10000000000000000")
  });
  await txSendEtherByUser2.wait(2)

  const burnTransaction2 = await mytoken.connect(user2).burn(ethers.BigNumber.from("80000000000000000000")) // 80 Token
  await burnTransaction2.wait(2);
  console.log("80 Token burned"); 
  console.log("Minting Nft...");
  
  const tokenURI2 = await mynft.tokenURI(ethers.BigNumber.from("1"));
  console.log("User TokenURI is: ",tokenURI2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
