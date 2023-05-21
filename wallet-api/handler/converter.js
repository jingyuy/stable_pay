function convertWalletToRes(wallet) {
  return {
    id: wallet._id,
    address: wallet.account?.address,
    currency: wallet.currency,
  };
}

module.exports = {
  convertWalletToRes,
};
