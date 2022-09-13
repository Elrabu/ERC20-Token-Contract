# Send Ether to deploy a Token Project

-Deploy the deploy.js script with:
```
yarn hardhat run scripts/deploy.js
```
- sendEther.sol / MyToken are deployed with a ContractFactory
- The contract address of both is displayed in the console
- checking if deployer of the contract has 101 Ethers:
```
var amount = await owner.getBalance();
  if(ethers.utils.formatEther(amount) >= 101){
    console.log("User has more than 100 Ether + 1 Gas Cost, Transaction approved!")
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