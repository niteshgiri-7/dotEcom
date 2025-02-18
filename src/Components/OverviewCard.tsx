import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { OverViewCountType } from '../types/dashboard';
import { memo } from 'react';


const OverviewCard = memo(({ name, count, rate }: OverViewCountType) => {
    console.log("card")
    const color = `hsl(${Math.round((rate / 100) * 120)}, 100%, 45%)`;

    return (
        <div className='bg-white  rounded-md p-2 flex justify-center gap-2 shadow-md shadow-gray-400  md:m-0 min-w-[200px] max-w-[200px]'>
            <div className='flex flex-col'>
                <span className='font-bold text-sm text-gray-500 text-center'>{name.toUpperCase()}</span>
                <span className='font-bold text-lg md:text-2xl '>{count}</span>
                <div className='flex justify-center items-center gap-1'>
                    {rate > 0 ? <BiTrendingUp className='text-green-500'/> : <BiTrendingDown className='text-red-500'/>}
                    <span>{rate}%</span>
                </div>
            </div>
            <div className={` h-[5rem] w-[5rem] border rounded-full relative`} style={{
                background: `conic-gradient(
                ${color} ${Math.abs(rate)/100*360}deg,
                rgb(255,255,255) 0
                )`
            }}>
             <div className=' w-[4rem] h-[4rem] bg-white  rounded-full absolute-center flex justify-center items-center'>
              {rate>0?"+":""}{rate}%
             </div>
            </div>
        </div>
    )
});

export default OverviewCard;
