import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Project Summary",
        },
    },
};

const labels = ["Users", "Orders", "Products", "Total Earnings"];

type LineChartPropType = {
    data: {
        users: number;
        orders: number;
        products: number;
        totalEarnings: number;
    };
};
const LineChart = ({ data }: LineChartPropType) => {
    return (
        <div>
            <Line
                options={options}
                data={{
                    labels,
                    datasets: [
                        {
                            label: "",
                            data: [
                                data.users,
                                data.orders,
                                data.products,
                                data.totalEarnings,
                            ],
                        },
                    ],
                }}
            />
        </div>
    );
};

export default LineChart;
