import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type TDataSet = {
    label: string
    fill: boolean,
    data: Array<number>,
    borderColor: string
    backgroundColor: string
}

type ChartState = {
    labels: Array<string>,
    datasets: TDataSet[]
}

const lineChartKeys = ['cases', 'todayCases', 'deaths', 'todayDeaths', 'active', 'critical', 'recovered', 'todayRecovered']

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        },
        title: {
            display: true,
            text: "Covid-19 Report Of World Wide Cases"
        }
    }
};

const initialDataList = {
    labels: ["Total Cases", "Today Cases", "Deaths", "Today Deaths", "Active", 'Critical', "Recovered", "Today Recovered"],
    datasets: [
        {
            label: "Info",
            fill: true,
            data: [],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ]
};

const Dashboard = (): JSX.Element => {

    const [chartData, setChartData] = useState<ChartState>(initialDataList);

    const fetchCovidReport = async () => {
        const res = await fetch('https://disease.sh/v3/covid-19/all');
        return res.json();
    };

    const { data } = useQuery('covidReport', fetchCovidReport);

    useEffect(() => {
        const chartDataList: any = {}
        data && Object.entries(data).forEach((ele: any) => {
            const [key, value] = ele;
            if (lineChartKeys.includes(key)) {
                chartDataList[`${key}`] = value
            }
        });

        setChartData((prev: any) => {
            return {
                ...prev,
                datasets: [
                    {
                        label: "Info",
                        fill: true,
                        data: Object.values(chartDataList),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)"
                    }
                ]
            }
        })
    }, [data])

    return (
        <div className='border-b-2'>
            <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
            <Line data={chartData} options={options} />

        </div>
    )
}

export default Dashboard