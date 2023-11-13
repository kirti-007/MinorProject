const path = require("path");
const HDWalletProvider = require('./client/node_modules/@truffle/hdwallet-provider');
require('./client/node_modules/dotenv').config();

const MNEMONIC = "thoughtloungeaffordhungrygingeremploygrabawkwardstuffbenefitfatherevidence";
const ALCHEMY_KEY = "fJLAScRMIXRUhbE2qO5IDRLxEGwkNvem"; // Change this variable name

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`),
      network_id: 1, // Mainnet network_id
      gas: 4500000
    }
  },
  compilers: {
    solc: {
      version: "0.8.6"
    }
  }
};
