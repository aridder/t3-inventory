import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalstorage";
import { trpc } from "../utils/trpc";

export function Header() {
  const router = useRouter();
  const [userId1, setUserId1] = useLocalStorage("newcy-user", "");

  const isLoggedIn = useMemo(() => {
    return !!userId1;
  }, [userId1]);

  console.log("isLoggedIn", isLoggedIn);
  console.log("usedId", userId1);

  const [inputUsername, setInputUsername] = useState<string>("");

  const login = trpc.useMutation(["userlogin"], {
    onSuccess: (data) => {
      if (!data) {
        console.log("user does not exists");
        return;
      }
      setUserId1(data.id);
      console.log("userdata on success", data);
    },
  });

  const signup = trpc.useMutation(["usersignup"], {
    onSuccess: (data) => {
      setUserId1(data.id);
      console.log("userdata on success", data);
    },
  });

  const confirmLogin = () => {
    const user = login.mutate({ username: inputUsername });
    console.log("userId in login", user);
  };

  const confirmSignup = () => {
    const user = signup.mutate({ username: inputUsername });
    console.log("userId in signyp", user);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputUsername(e.target.value);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    setUserId1(undefined);
  };

  return (
    <header>
      <div className="m-10 flex flex-row bg-slate-400 justify-between">
        <div className="flex flex-row items-start space-x-5">
          <div className="flex w-full flex-row items-start lg:ml-auto lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row">
            <Link href="/items">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto ">
                Items
              </a>
            </Link>
            <Link href="/create">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto ">
                Create Item
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mx-5">
          {isLoggedIn ? (
            <>
              <p>You are logged in with id: {userId1}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <input
                className="m-5"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
              />
              <button onClick={confirmLogin}>Login</button>
              <button onClick={confirmSignup}>Signup</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
