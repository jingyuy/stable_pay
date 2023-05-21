import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect } from "react";

const cookies = new Cookies();

export default function Home() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        console.log(session);
        router.push("/dashboard");
      }
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-4">
        <div className="p-5 rounded-md">
          <h1 className="text-2xl font-bold text-black">Home</h1>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          type="button"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
