import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';

interface cardPropsType {
    header: string;
    amount: number;
    rate: number;
    color: string;
}
const Card = ({ header, amount, rate ,color}: cardPropsType) => {
    return (
        <div className='bg-white rounded-md p-4 flex gap-2 shadow-md shadow-gray-400 m-auto md:m-0 '>
            <div className='flex flex-col'>
                <span className='font-bold text-sm text-gray-500'>{header}</span>
                <span className='font-bold text-lg md:text-2xl'>{amount}</span>
                <div className='flex items-center gap-1'>
                    {rate > 0 ? <BiTrendingUp className='text-green-500'/> : <BiTrendingDown className='text-red-500'/>}
                    <span>{rate}%</span>
                </div>
            </div>
            <div className={` h-[4rem] w-[4rem] border rounded-full flex justify-center items-center `} style={{
                background: `conic-gradient(
                ${color} ${Math.abs(rate)/100*360}deg,
                rgb(255,255,255) 0
                )`
            }}>
             <div className=' w-[3rem] h-[3rem] bg-white  rounded-full flex justify-center items-center'>
              {rate>0?"+":""}{rate}%
             </div>
            </div>
        </div>
    )
}

export default Card
