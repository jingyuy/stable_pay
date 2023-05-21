require("dotenv").config();
const express = require("express");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("./common/error.js");
const {
  createWalletHandler,
  getWalletHandler,
} = require("./handler/wallet-handler.js");

const app = express();
const port = 3001;

app.use(express.json());

app.post("/wallet/create", asyncHandler(createWalletHandler));

app.get("/wallet/:id", asyncHandler(getWalletHandler));

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
