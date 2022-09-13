const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners(); 
  const _to = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Token = await hre.ethers.getContractFactory("sendEthers");
  const sendether = await Token.deploy()
  await sendether.deployed();
  console.log(`SendEther contract deployed to ${sendether.address}`);

  /*const MyToken = await hre.ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.deploy()
  await mytoken.deployed();
    
  console.log(`MyToken contract deployed to ${mytoken.address}`); */
  var amount = await sendether.getBalance();
  const balanceInEth = ethers.utils.formatEther(amount);
  console.log("Current Balance of ",sendether.address, ":", balanceInEth );
  console.log("------------------------------------------------------------------------------------------------");

  await owner.sendTransaction({
    to: _to,
    value: ethers.utils.parseEther("1.0"), 
  });
  
  var amount = await owner.getBalance();
  const InEth = ethers.utils.formatEther(amount);
  
  console.log("Balance of",owner.address,": ", InEth );
  console.log("------------------------------------------------------------------------------------------------");

  var newamount = await sendether.getBalance();
  const newbalanceInEth = ethers.utils.formatEther(newamount);
  console.log("New Balance of ",sendether.address, ":", newbalanceInEth );
  console.log("------------------------------------------------------------------------------------------------");
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
