# Send Ether to deploy a Token Project
- Before deploying use:
```
yarn add --dev hardhat
yarn
```
- Deploy the deploy.js script with:
```
yarn hardhat run scripts/deployMintAndBurn.js
```
- Deploy to hardhat with:
```
yarn hardhat run scripts/deployMintAndBurn.js --network ganache
```
# How the the deployMintandNurn.js works:
- Uses the hardhat libaries:
```
const { ethers } = require("hardhat");
const hre = require("hardhat");
```

- the deployer/users are defined:
```
const [deployer, user, user2] = await ethers.getSigners();
```

- Deploy the myToken.sol Contract and printing its address:
```
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const mytoken = await MyToken.connect(deployer).deploy()
  await mytoken.deployed(); 
  console.log(`MyToken deployed to ${mytoken.address} for 1 Ether`);
```
- MyNft.sol / MyToken.sol are deployed with a ContractFactory
- set the address of NFT contract in Token Contract:
```
await mytoken.connect(deployer).setNftContractAddress(mynft.address)
```
- sending 1 Ether to the MyToken Contract:
```
await user.sendTransaction({
    to: mytoken.address,
    value: ethers.utils.parseEther("1.0"),
  });
```

 - 100 Token from "user" are burned:
 ```
 const burnTransaction = await mytoken.connect(user).burn(ethers.utils.parseEther("100.0"))
  burnTransaction.wait();
 ```
 - waiting for confirmation throught blockchain:
 ```
 const tokenURI = await mynft.tokenURI(0);
 ```

- Get the URI of the minted Nft and print it in the console:
```
 const tokenURI = await mynft.tokenURI(0);
console.log("User TokenURI is: ",tokenURI);
```

# How the MyToken.sol Contract works:
- Imports the ERC20burnable contract:
```
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
```
- Contract/variables/constructor defined:
```
contract MyNft is ERC721URIStorage{
    uint256 private s_tokenCounter;
    uint private amount;
    uint256 private burned;

    constructor() ERC721("YourNft", "YN") {
         s_tokenCounter = 0;
         
    }
```
- Function to burn the tokens:
```
function _burn(address account, uint256 amount) internal override {
        super._burn(account, amount);
        nftContract.mintNft(amount,account);
    }
```
- function to set the nftContractAddress:
```
function setNftContractAddress(IMyNft addr) public onlyOwner{ 
        nftContract = addr;
    }
```
- Upon receiving Ether returns the balance:
```
function getBalance() public view returns (uint) {
        return address(this).balance;
    }
```

# How the Mynft.sol Contract works:
- Imports the ERC721Storage.sol Contract:
```
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
```
- Contract/variables/constructor defined:
```
contract MyNft is ERC721URIStorage{
    uint256 private s_tokenCounter;
    uint private amount;
    uint256 private burned;

    constructor() ERC721("YourNft", "YN") {
         s_tokenCounter = 0;
         
    }
```
- Mints the NFT based on the owner and the amount of token burned
- Uses a different URI if more or less then 100 tokens are burned
```
function mintNft (uint256 burnedToken,address receiver) public returns(uint256,uint256) {   
        string memory tokenURI = "bafybeig27ros3pems4tji7azvwh2t72oc7fd2phdohviafadi26efmqoeu";
        string memory tokenURI2 = "bafkreih6j2bs2uokr66rdlh2ti4otdyjagmpnnvqmhmtyz4cv32vfhcqm4";
        _safeMint(receiver, s_tokenCounter);
        if(burnedToken >= 100*10**18) {
            _setTokenURI(s_tokenCounter, tokenURI);
        } else {
             _setTokenURI(s_tokenCounter, tokenURI2); //dynamic tokeURI
        }
        
        s_tokenCounter = s_tokenCounter + 1;
       
        return (s_tokenCounter,burnedToken);
    }
```