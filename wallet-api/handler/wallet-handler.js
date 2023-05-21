const { getWallet, createWallet } = require("../repository/wallet.js");
const { convertWalletToRes } = require("./converter.js");
const web3Client = require("../web3/web3-client.js");

async function createWalletHandler(req, res, next) {
  const account = web3Client.eth.accounts.create();
  const wallet = await createWallet(req.body.currency, account, next);
  const resObj = convertWalletToRes(wallet);
  res.send(resObj);
}

async function getWalletHandler(req, res, next) {
  const walletId = req.params.id;
  const wallet = await getWallet(walletId, next);
  res.send(convertWalletToRes(wallet));
}

module.exports = {
  createWalletHandler,
  getWalletHandler,
};
