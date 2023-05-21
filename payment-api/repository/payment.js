require("dotenv").config();
const client = require("../db/client.js");
const { ObjectId } = require("mongodb");
const { NotFoundError } = require("../common/error.js");

const mongodb_name = process.env.MONGODB_DB_NAME;
const payment_table_name = "Payment";

async function getPayment(merchantId, paymentId, next) {
  try {
    const payment = await client
      .db(mongodb_name)
      .collection(payment_table_name)
      .findOne({ _id: new ObjectId(paymentId) });
    if (
      payment != null &&
      (merchantId == null || payment.merchantId == merchantId)
    ) {
      return payment;
    } else {
      next(
        new NotFoundError(
          `Can not find payment by payment id and merchant id. payment id: ${paymentId}, merchant id: ${merchantId}`
        )
      );
    }
  } catch (err) {
    next(err);
  }
}

async function createPayment(
  merchant_id,
  amount,
  currency,
  merchantReference,
  next
) {
  try {
    const inserted = await client
      .db(mongodb_name)
      .collection(payment_table_name)
      .insertOne({
        merchantId: merchant_id,
        amount: amount,
        currency: currency,
        merchantReference: merchantReference,
      });
    return getPayment(merchant_id, inserted.insertedId, next);
  } catch (err) {
    next(err);
  }
}

async function updatePayment(paymentId, walletId, next) {
  try {
    const updated = await client
      .db(mongodb_name)
      .collection(payment_table_name)
      .updateOne(
        { _id: new ObjectId(paymentId) },
        { $set: { walletId: walletId } }
      );
    return getPayment(null, paymentId, next);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getPayment,
  createPayment,
  updatePayment,
};
