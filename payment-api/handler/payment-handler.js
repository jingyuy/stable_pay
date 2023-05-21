const web_utils = require("../utils/web-utils.js");
const qr = require("qrcode");
const {
  getPayment,
  createPayment,
  updatePayment,
} = require("../repository/payment.js");
const { convertPaymentToRes } = require("./converter.js");
const { createWallet, getWallet } = require("../gateway/wallet.js");

function createPaymentUrl(req, paymentId) {
  return (
    req.protocol + "://" + req.get("host") + "/payment/" + paymentId + "/pay"
  );
}

async function createPaymentHandler(req, res, next) {
  const merchantId = web_utils.getMerchantId(req);
  const payment = await createPayment(
    merchantId,
    req.body.amount,
    req.body.currency,
    req.body.merchantReference,
    next
  );
  const resObj = convertPaymentToRes(payment);
  resObj.paymentUrl = createPaymentUrl(req, payment._id);
  res.send(resObj);
}

async function getPaymentHandler(req, res, next) {
  const merchantId = web_utils.getMerchantId(req);
  const paymentId = req.params.id;
  const payment = await getPayment(merchantId, paymentId, next);

  const resObj = convertPaymentToRes(payment);
  resObj.paymentUrl = createPaymentUrl(req, payment._id);
  res.send(resObj);
}

async function getPaymentPayHandler(req, res, next) {
  const paymentId = req.params.id;
  let payment = await getPayment(null, paymentId, next);
  let wallet = null;
  if (payment.walletId == null) {
    wallet = await createWallet(payment.currency, next);
    payment = await updatePayment(payment._id, wallet.id, next);
  } else {
    wallet = await getWallet(payment.walletId, next);
  }

  const paymentAmount = payment.amount;
  const paymentCurrency = wallet.currency;
  const paymentAddress = wallet.address;
  qr.toDataURL(`ethereum:${paymentAddress}`, (err, qrCodeImageSrc) => {
    if (err) throw err;
    // Let us return the QR code image as our response and set it to be the source used in the webpage
    res.render("scan", {
      qrCodeImageSrc,
      paymentAmount,
      paymentCurrency,
      paymentAddress,
    });
  });
}

module.exports = {
  createPaymentHandler,
  getPaymentHandler,
  getPaymentPayHandler,
};
