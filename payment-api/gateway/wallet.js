require("dotenv").config();
const axios = require("axios");

const walletServerUrl = process.env.WALLET_SERVER_URL;

async function createWallet(currency, next) {
  try {
    const payload = { currency: currency };

    const res = await axios.post(walletServerUrl + "/wallet/create", payload);
    const data = res.data;
    return data;
  } catch (err) {
    next(err);
  }
}

async function getWallet(walletId, next) {
  try {
    const res = await axios.get(walletServerUrl + `/wallet/${walletId}`);
    return res.data;
  } catch (err) {
    next(err);
  }
}

module.exports = { createWallet, getWallet };
