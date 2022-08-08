import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import ItemCreate from "../components/ItemCreate";
import ItemList from "../components/ItemList";
import ItemTransfer from "../components/ItemTransfer";
import { trpc } from "../utils/trpc";

const Items: NextPage = () => {
  const [item, setItem] = useState<Item>();

  const listUserItems = trpc.useQuery(["item.list-own"]);

  const transferItemOnSuccess = () => {
    setItem(undefined);
    listUserItems.refetch();
  };

  return (
    <>
      <main className="container mx-auto flex flex-col items-center min-h-screen p-4">
        <h1 className="text-3xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Items
        </h1>
        <ItemCreate onSuccess={() => listUserItems.refetch()} />
        {item && <ItemTransfer onSuccess={transferItemOnSuccess} item={item} />}

        {!listUserItems.data ? (
          <div>Loading</div>
        ) : (
          <ItemList
            items={listUserItems.data}
            onItemClick={(item) => setItem(item)}
          />
        )}
      </main>
    </>
  );
};

export default Items;
