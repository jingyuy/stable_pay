function convertPaymentToRes(payment) {
  return {
    id: payment._id,
    merchantId: payment.merchantId,
    amount: payment.amount,
    currency: payment.currency,
    merchantReference: payment.merchantReference,
    walletId: payment.walletId,
  };
}

module.exports = {
  convertPaymentToRes,
};
