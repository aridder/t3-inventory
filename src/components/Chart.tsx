import { Item } from "@prisma/client";
import { ChartOptions } from "chart.js";
import { NextPage } from "next";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

interface ChartProps {
  name: string;
  items: { createdAt: Date }[];
}

// "2022-02-08T21:41:54.137Z"

const LineChart: NextPage<ChartProps> = ({ name, items }) => {
  const monthWithItemCreationCount = useMemo(() => {
    return items.reduce<Record<number, number>>((p, n) => {
      const date = new Date(n.createdAt);
      let count = p[date.getMonth()] ?? 0;
      count += 1;

      p[date.getMonth()] = count;

      return p;
    }, {});
  }, [items]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68,1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68,0.3)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: true,
      },
      yAxis: {
        min: 0,
        display: true,
      },
    },
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "September",
    ],
    datasets: [
      {
        data: [...Object.values(monthWithItemCreationCount)],
      },
    ],
  };

  return (
    <div className="flex flex-col rounded shadow-sm bg-white h-min p-5">
      <p className="text-m mb-5">{name}</p>
      <div className="p-0">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
