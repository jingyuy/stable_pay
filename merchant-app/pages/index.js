import Image from "next/image";
import { Inter } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";
const axios = require("axios");
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";

const inter = Inter({ subsets: ["latin"] });

function Home({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(data ? data.amount : "");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const router = useRouter();

  const handleCheckout = () => {
    setIsLoading(true);
    if (data) {
      const windowName = "Payment Window";
      const windowFeatures = "width=600,height=400";
      const newWindow = window.open(
        data.paymentUrl,
        windowName,
        windowFeatures
      );

      if (window.focus) {
        newWindow.focus();
      }
    } else {
      try {
        axios
          .post("/api/payment/create", {
            amount: amount,
            currency: "ETH",
          })
          .then((response) => {
            const windowName = "Payment Window";
            const windowFeatures = "width=600,height=400";
            const newWindow = window.open(
              response.data.paymentUrl,
              windowName,
              windowFeatures
            );

            if (window.focus) {
              newWindow.focus();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-5 rounded-md">
          <h1 className="text-2xl font-bold text-black">Checkout</h1>
        </div>
        <div className="p-5 rounded-md">
          {router.query.paymentId ? (
            <div>
              <p>Payment ID: {router.query.paymentId}</p>
              <p>
                total: {data.amount} {data.currency}
              </p>
            </div>
          ) : (
            <div>
              <p>Total ETH:</p>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                min="0"
                max="100"
                step="0.000001"
                class="w-auto mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
                placeholder="Enter amount"
                onChange={handleAmountChange}
              />
            </div>
          )}
        </div>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 ${
            (isLoading || amount <= 0) && "opacity-50 cursor-not-allowed"
          }`}
          type="button"
          onClick={() => handleCheckout()}
          disabled={isLoading || amount <= 0}
        >
          Checkout
        </button>
      </div>
    </main>
  );
}

Home.getInitialProps = async function (context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const { paymentId } = context.query;
  if (paymentId) {
    const res = await fetch(`${origin}/api/payment/${paymentId}`);
    const data = await res.json();
    return { data };
  } else {
    return {};
  }
};

export default Home;
