import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemTransferProp {
  item: Item;
  onSuccess: () => void;
}

const ItemTransfer: NextPage<ItemTransferProp> = ({ item, onSuccess }) => {
  const [error, setError] = useState<string>();
  const [toUserId, setToUserId] = useState<string>();

  const transferItemMutation = trpc.useMutation(["item.transfer"], {
    onSuccess: (data) => {
      onSuccess();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleToUserIdChange = (e: any) => {
    e.preventDefault();
    setError(undefined);
    setToUserId(e.target.value);
  };

  const confirmTransfer = (e: any) => {
    e.preventDefault();
    if (!toUserId || !item) {
      console.error("missing required item or toUserId");
      return;
    }
    transferItemMutation.mutate({ toUserId: toUserId, itemId: item?.id });
  };

  return (
    <div className="flex flex-col w-1/2 items-center m-16 border-2 rounded-md p-5 bg-orange-400">
      <p className="my-4 text-2xl">{item.title}</p>
      <p className="my-4 text-2xl">Transfer item to:</p>
      <div className="flex flex-row justify-center items-center space-x-5">
        <input
          className="h-10 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          onChange={handleToUserIdChange}
          placeholder="user id"
        />
        <button
          className="border-r-2 p-3 rounded-lg my-5 bg-green-200"
          onClick={confirmTransfer}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default ItemTransfer;
