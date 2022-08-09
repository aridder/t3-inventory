import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalstorage";
import { trpc } from "../utils/trpc";

export function Header() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [userId, setUserId] = useLocalStorage("newcy-userid", undefined);
  const [inputUsername, setInputUsername] = useState<string>("");

  const isLoggedIn = useMemo(() => {
    console.log("userid", userId);
    return userId !== undefined && userId !== "undefined";
  }, [userId]);

  console.log("isLoggedIN", isLoggedIn);
  const login = trpc.useMutation(["user.login"], {
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      setUserId(data.id);
      router.reload();
    },
    onError: (error) => {
      setError(error.message);
      console.log("error", error);
    },
  });

  const signup = trpc.useMutation(["user.signup"], {
    onSuccess: (data) => {
      setUserId(data.id);
      router.reload();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const confirmLogin = () => {
    login.mutate({ username: inputUsername });
  };

  const confirmSignup = () => {
    error && setError(undefined);
    signup.mutate({ username: inputUsername });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setError(undefined);
    setInputUsername(e.target.value);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    setUserId(undefined);
    router.reload();
  };

  return (
    <header>
      <div className="flex flex-row bg-blue-400 justify-between">
        <div className="flex flex-row items-start space-x-5">
          <div className="flex w-full flex-row items-start lg:ml-auto lg:inline-flex lg:h-auto p-10 space-x-20  lg:w-auto lg:flex-row">
            <Link href="/dashboard">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white text-3xl hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto ">
                Dashboard
              </a>
            </Link>
            <Link href="/items">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white text-3xl hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto ">
                Inventory
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row space-x-5 mx-10">
            {isLoggedIn ? (
              <>
                <p>You are logged in with id: {userId}</p>
                <button
                  className="border-r-2 rounded-lg w-24 bg-orange-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <input
                  className="m-5"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
                <button
                  className="border-r-2 rounded-lg w-24 bg-green-200"
                  onClick={confirmLogin}
                >
                  Login
                </button>
                <button
                  className="border-r-2 rounded-lg w-24 bg-green-200"
                  onClick={confirmSignup}
                >
                  Signup
                </button>

                {error && <p>{error}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
