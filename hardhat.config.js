require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
//0xe0822dfeCee0F33539f8dc5a25698a67d23a9Ee0 this has been deployed
const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// GOERLI_API_KEY = process.env.GOERLI_API_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
