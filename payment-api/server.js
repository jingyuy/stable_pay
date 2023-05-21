require("dotenv").config();
const express = require("express");
const basicAuth = require("express-basic-auth");
const asyncHandler = require("express-async-handler");
const { NotFoundError } = require("./common/error.js");
const {
  createPaymentHandler,
  getPaymentHandler,
  getPaymentPayHandler,
} = require("./handler/payment-handler.js");

const app = express();
const port = 3000;

// Define the basic authentication middleware
const basicAuthMiddleware = basicAuth({
  users: {
    merchant1: "123456",
  },
  unauthorizedResponse: (req) => {
    return req.auth
      ? "Invalid username or password"
      : "No credentials provided";
  },
});

// Define a middleware to skip authentication for specific paths
const skipAuthMiddleware = (req, res, next) => {
  if (req.path.startsWith("/payment/") && req.path.endsWith("/pay")) {
    // Add the paths you want to exclude here
    return next();
  }
  return basicAuthMiddleware(req, res, next);
};

app.use(skipAuthMiddleware);

app.use(express.json());

app.set("view engine", "ejs");

app.post("/payment/create", asyncHandler(createPaymentHandler));

app.get("/payment/:id", asyncHandler(getPaymentHandler));

app.get("/payment/:id/pay", asyncHandler(getPaymentPayHandler));

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
