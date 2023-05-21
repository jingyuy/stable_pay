const paymentApi = require("../../../gateway/payment-api.js");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

export default function handler(req, res) {
  jsonParser(req, res, async () => {
    const { paymentId } = req.query;
    const checkout = await paymentApi.getPayment(paymentId);
    res.status(200).json(checkout);
  });
}
