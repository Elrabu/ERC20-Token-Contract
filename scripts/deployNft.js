const hre = require("hardhat");

async function main() {
    const Nft = await hre.ethers.getContractFactory("MyNft");
    const mynft = await Nft.deploy()
    await mynft.deployed();
    console.log(`MyNft deployed to ${mynft.address}`);

    console.log("Minting Nft...");
    await mynft.mintNft(100);

    const counter = await mynft.getTokenCounter();
    console.log("You own", counter, "Nft's");
    const burned = await mynft.getburnedToken();
    console.log("token burned:", burned);
  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });