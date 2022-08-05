import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemCreateProps {
  onSuccess: () => void;
}

const ItemCreate: NextPage<ItemCreateProps> = ({ onSuccess }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [itemTitle, setItemTitle] = useState<string>();
  const [error, setError] = useState<string>();

  const createItemMutation = trpc.useMutation(["itemcreate"], {
    onSuccess: (data) => {
      inputRef!.current!.value = "";
      setItemTitle(undefined);
      onSuccess();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setError(undefined);
    setItemTitle(e.target.value);
  };

  const confirmCreate = async () => {
    if (!itemTitle || itemTitle === "") {
      setError("Invalid title");
      return;
    }
    const res = await createItemMutation.mutate({ title: itemTitle });
    console.log("res", res);
  };

  return (
    <div className="flex flex-col w-1/2 items-center m-16 border-2 rounded-md p-5 bg-slate-400">
      <p className="my-4 text-2xl">Register a new item here</p>
      <input
        ref={inputRef}
        className="h-10 px-3 mt-10 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        type="text"
        onChange={handleChange}
        placeholder="Name your item"
      />
      <button
        className="border-r-2 rounded-lg p-2 my-5 bg-green-200"
        onClick={confirmCreate}
      >
        Create item!
      </button>
      {error && <p className="text-red-600">Error: {error} </p>}
    </div>
  );
};

export default ItemCreate;
