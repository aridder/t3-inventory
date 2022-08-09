import { Item } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import LineChart from "../components/Chart";
import ItemCreate from "../components/ItemCreate";
import ItemList from "../components/ItemList";
import ItemTransfer from "../components/ItemTransfer";
import MetricItem from "../components/MetricItem";
import { trpc } from "../utils/trpc";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: NextPage = () => {
  const numberOfItems = trpc.useQuery(["dashboard.itemcount"]);
  const numberOfUsers = trpc.useQuery(["dashboard.usercount"]);
  const numberOfTransfers = trpc.useQuery(["dashboard.transfercount"]);
  const items = trpc.useQuery(["dashboard.items"]);
  const itemtransfer = trpc.useQuery(["dashboard.itemtransfer"]);

  return (
    <>
      <div className="bg-gray-100 p-4 text-center flex flex-col gap-y-4">
        <p className="text-2xl">Key metrics</p>
        <div className="mx-auto grid gap-10 sm:grid-cols-2 sm:auto-cols-min lg:grid:cols-3 content-start">
          <MetricItem
            name="Users"
            value={
              numberOfUsers.data ? numberOfUsers.data.toString() : "Laster"
            }
          />
          <MetricItem
            name="Items"
            value={
              numberOfItems.data ? numberOfItems.data.toString() : "Laster"
            }
          />
          <MetricItem
            name="Transfers"
            value={
              numberOfTransfers.data
                ? numberOfTransfers.data.toString()
                : "Laster"
            }
          />
        </div>
        <p className="text-2xl">Key metrics</p>
        <div className="mx-auto grid gap-10 sm:grid-cols-2 sm:auto-cols-min lg:grid:cols-3 my-4 bg-gray-100 content-start">
          {items.data ? (
            <LineChart items={items.data} name={"New items per month"} />
          ) : null}
          {itemtransfer.data ? (
            <LineChart items={itemtransfer.data} name={"Transfers per month"} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
