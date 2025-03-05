import {
    BarElement,
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { memo } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface BarChartPropsType{
     horizontal?:boolean;
     dataSet_1:number[];
     dataSet_2:number[];
     bgColor1:string;
     bgColor2:string;
     labels?:string[];
     title1:string;
     title2:string;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June'];

const BarChart= memo(({horizontal=false,dataSet_1,dataSet_2,bgColor1,bgColor2,labels=months,title1,title2}:BarChartPropsType)=> {
 console.log("barchart")
  const options:ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal?"y":"x",
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Last six months',
      },
    },
    scales: {
      x: {
        beginAtZero:true,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero:true,
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio:false
  };

  const data:ChartData<"bar",number[],string> = {
    labels,
    datasets: [
      {
        label: title1,
        data: dataSet_1,
        backgroundColor: bgColor1,
      },
      {
        label: title2,
        data: dataSet_2,
        backgroundColor: bgColor2,
      },
    ],
  };
  return <Bar options={options} data={data}/>;
});

export default BarChart;