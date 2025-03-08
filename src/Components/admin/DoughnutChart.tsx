import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DoughnutChartPropsType {
     offset?:number;
     legends?:boolean;
     labels:string[];
     data:number[];
     backgroundColor:string[];
     cutout?:number|string;
}

const DoughnutChart = memo(({offset,legends=true,labels,data,backgroundColor,cutout}:DoughnutChartPropsType) => {
const doughnutData:ChartData<"doughnut",number[],string>={
  labels,
  datasets:[{
    data,
    backgroundColor,
    borderWidth:0,
    offset,
  }]
};
const doughnutOptions:ChartOptions<"doughnut">={
responsive:true,
plugins:{
  legend:{
    display:legends,
    position:"bottom",
    labels:{
      padding:40
    }
  },
},
cutout,
maintainAspectRatio:false,
};
  return (
   <Doughnut data={doughnutData} options={doughnutOptions}/>
  )
});

export default DoughnutChart;
