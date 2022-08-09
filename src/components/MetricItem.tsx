import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface MetricItemProps {
  name: string;
  value: string;
}

const MetricItem: NextPage<MetricItemProps> = ({ name, value }) => {
  return (
    <div className="flex flex-col rounded p-5 shadow-sm bg-white h-min">
      <p className="text-m mb-5">{name}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MetricItem;
