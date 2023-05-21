// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const paymentApi = require("../../../gateway/payment-api.js");

export default function handler(req, res) {
  jsonParser(req, res, async () => {
    req.body.merchantReference = "web-store-001";
    const checkout = await paymentApi.createPayment(req.body);
    res.status(200).json(checkout);
  });
}
