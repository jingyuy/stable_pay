require("dotenv").config();
require("dotenv").config();
const axios = require("axios");

const paymentApiUrl = process.env.PAYMENT_API_URL;
const paymentApiUser = process.env.PAYMENT_API_USER;
const paymentApiPassword = process.env.PAYMENT_API_PASSWORD;

async function createPayment(payload) {
  const url = paymentApiUrl + "/payment/create";
  const res = await axios.post(
    url,
    {
      amount: payload.amount,
      currency: payload.currency,
      merchantReference: payload.merchantReference,
    },
    {
      auth: {
        username: paymentApiUser,
        password: paymentApiPassword,
      },
    }
  );
  const data = res.data;
  return data;
}

async function getPayment(paymentId) {
  const url = paymentApiUrl + `/payment/${paymentId}`;
  const res = await axios.get(url, {
    auth: {
      username: paymentApiUser,
      password: paymentApiPassword,
    },
  });
  const data = res.data;
  return data;
}

module.exports = { createPayment, getPayment };
