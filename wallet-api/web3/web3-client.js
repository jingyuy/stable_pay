require("dotenv").config();
const Web3 = require("web3");

const network = process.env.ETHEREUM_NETWORK_SEPOLIA;
const infura_api_key = process.env.INFURA_API_KEY;

// create a web3 instance
const web3Client = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${infura_api_key}`
  )
);

module.exports = web3Client;
