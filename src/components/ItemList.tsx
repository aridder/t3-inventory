import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemCreateProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

const ItemList: NextPage<ItemCreateProps> = ({ items, onItemClick }) => {
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-2xl mb-5">Your things</p>
      </div>
      {items.length === 0 && (
        <p className="text-2l mb-5">You do not have any things registered</p>
      )}

      {items.map((item, index) => {
        return (
          <div
            className="flex flex-row border-2 p-2 space-x-5 justify-between  items-center"
            key={index}
          >
            <p className="text-lg">{item.title}</p>
            <button
              className="px-8 bg-green-200"
              onClick={() => onItemClick(item)}
            >
              Show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
