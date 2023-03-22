// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//return the ether  balance of a given address
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

//log the ether balance for a list of address
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance`, await getBalance(address));
    idx++;
  }
}

//logs the memos stored on-chain from coffee purchase
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp},${tipper},(${tipperAddress}) said:"${message}"`
    );
  }
}

async function main() {
  //get example accounts.
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  //Get the contract to deploy.
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);

  //check balances before coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);

  //Buy the owner a few coffee
  const tip = {value:hre.ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(tipper).buyCoffee("Abhi","you are best",tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Bishal","Awesome",tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Kulendu","love your way",tip);


  //check balances after coffee purchase
  console.log("== Bought coffee ==");
  await printBalances(addresses);

  //widthdraw fund
  await buyMeACoffee.connect(owner).withdrawTips();

  //check balance after withdraw
  console.log("== Widthraw tips ==");
  await printBalances(addresses);


  //Read all the memos left for the owner
  console.log("== Memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
