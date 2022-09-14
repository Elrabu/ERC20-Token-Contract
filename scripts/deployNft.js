const hre = require("hardhat");

async function main() {
    const Nft = await hre.ethers.getContractFactory("MyNft");
    const mynft = await Nft.deploy()
    await mynft.deployed();
    console.log(`MyNft deployed to ${mynft.address}`);

    await mynft.mintNft(2);

    const counter = await mynft.getTokenCounter();
    console.log("You own", counter, "Nft's");
    const amount = await mynft.getAmount();
    console.log(amount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });