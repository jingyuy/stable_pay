import { NextPage } from "next";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Dashboard() {
  const { data: session } = useSession();

  const router = useRouter();
  const message = session?.user.name;

  function handleLogout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
      </Head>
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="font-bold text-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="font-bold text-gray-700">
                About
              </a>
            </li>
            <li className="hover:bg-blue-500 text-white" onClick={handleLogout}>
              <a href="#" className="font-bold text-gray-700">
                Signout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <div className="p-5 rounded-md">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        </div>
        <div className="p-5 rounded-md">
          <h1 className="text-xl text-black">Message: {message}</h1>
        </div>
      </div>
    </div>
  );
}
