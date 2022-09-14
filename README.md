# Send Ether to deploy a Token Project
- Before deploying use
```
yarn add --dev hardhat
yarn
```
-Deploy the deploy.js script with:
```
yarn hardhat run scripts/deploy.js
```
# How the Code works:
- Uses the hardhat libaries:
```
const { ethers } = require("hardhat");
const hre = require("hardhat");
```
- owner/_to address is defined:
```
const [owner] = await ethers.getSigners();
const _to = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
```
- Deploy the sendEthers.sol Contract
```
  const Token = await hre.ethers.getContractFactory("sendEthers");
  const sendether = await Token.deploy()
  await sendether.deployed();
  console.log(`SendEther contract deployed to ${sendether.address}`);
```
- sendEther.sol / MyToken.sol are deployed with a ContractFactory
- The contract address of both is displayed in the console
- checking if deployer of the contract has 2 Ethers:
```
var amount = await owner.getBalance();
  if(ethers.utils.formatEther(amount) >= 2){
    console.log("User has more than 1 Ether + 1 Gas Cost, Transaction approved!")
  }
```
- sending the 100 ether to the Address of the sendEther Contract:
```
await owner.sendTransaction({
      to: _to,
      value: ethers.utils.parseEther("100.0"),
    });
```
 - After the Transaction the new balance of the contract is shown in the console
 - burns the Token(removes the Token):
 ```
    console.log("burning Token...")
    await mytoken.burnFrom(owner.address,1);
    console.log("Token burned!");
 ```
