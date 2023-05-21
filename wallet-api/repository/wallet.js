require("dotenv").config();
const client = require("../db/client.js");
const { ObjectId } = require("mongodb");
const { NotFoundError } = require("../common/error.js");

const mongodb_name = process.env.MONGODB_DB_NAME;
const wallet_table_name = "Wallet";

async function getWallet(walletId, next) {
  try {
    const wallet = await client
      .db(mongodb_name)
      .collection(wallet_table_name)
      .findOne({ _id: new ObjectId(walletId) });
    if (wallet != null) {
      return wallet;
    } else {
      next(
        new NotFoundError(
          `Can not find wallet by wallet id. wallet id: ${walletId}`
        )
      );
    }
  } catch (err) {
    next(err);
  }
}

async function createWallet(currency, account, next) {
  try {
    const inserted = await client
      .db(mongodb_name)
      .collection(wallet_table_name)
      .insertOne({
        currency: currency,
        account: account,
      });
    return getWallet(inserted.insertedId, next);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getWallet,
  createWallet,
};
