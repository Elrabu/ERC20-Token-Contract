const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners(); 
  const _to = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Token = await hre.ethers.getContractFactory("sendEthers");
  const sendether = await Token.deploy()
  await sendether.deployed();
  console.log(`SendEther contract deployed to ${sendether.address}`);

  var amount = await sendether.getBalance();
  const balanceInEth = ethers.utils.formatEther(amount);
  console.log("------------------------------------------------------------------------------------------------");
  console.log("Current Balance of ",sendether.address, ":", balanceInEth );
  console.log("------------------------------------------------------------------------------------------------");

  var amount = await owner.getBalance();
  if(ethers.utils.formatEther(amount) >= 2){
    console.log("User has more than 1 Ether + 1 Gas Cost, Transaction approved!")
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const mytoken = await MyToken.deploy()
    await mytoken.deployed(); 
    console.log(`MyToken deployed to ${mytoken.address} for 1 Ether`); 
    console.log("------------------------------------------------------------------------------------------------");
    await owner.sendTransaction({
      to: _to,
      value: ethers.utils.parseEther("1.0"), });
  
    var amount = await owner.getBalance();
    const InEth = ethers.utils.formatEther(amount);
  
    console.log("Balance of",owner.address,": ", InEth );
    console.log("------------------------------------------------------------------------------------------------");

    var newamount = await sendether.getBalance();
    const newbalanceInEth = ethers.utils.formatEther(newamount);
    console.log("New Balance of",sendether.address, ":", newbalanceInEth );
    console.log("------------------------------------------------------------------------------------------------");

    //Burn the Token:
    console.log("burning Token...")
    await mytoken.burnFrom(owner.address,1);
    console.log("Token burned!");

    //Deploy the Nft Contract and mint your Nft:
    const Nft = await hre.ethers.getContractFactory("MyNft");
    const mynft = await Nft.deploy()
    await mynft.deployed();
    console.log(`MyNft deployed to ${mynft.address}`);

    await mynft.mintNft(1);

    const counter = await mynft.getTokenCounter();
    console.log("You own", counter, "Nft's");
   /* const number = await mynft.getAmount();
    console.log(number); */

  }

  //await mytoken.burnFrom(owner.address, 1);
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
