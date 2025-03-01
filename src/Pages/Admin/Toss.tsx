import { useState } from "react";
import NavBar from "../../Components/NavBar";


const Toss = () => {
  const heads ='/heads.jpg';
  const tails = '/tails.jpg';
  const coinFlipSound =new Audio('/coinFlip.mp3');

  const [side,setSide] = useState(heads);
  const [isFlipping,setIsFlipping] = useState<boolean>(false);  

  const flipCoin = ()=>{
  
    setIsFlipping(true);
    coinFlipSound.play();
    setTimeout(() => {
      const side = Math.floor(Math.random()*10)<5?heads:tails;
      setSide(side);
      setIsFlipping(false)
    }, 1200);


  }

  return (
    <div className="flex min-h-screen w-screen bg-gray-200">
      <NavBar/>
      <main className="flex-1 flex justify-center items-center relative bg-gray-200">
          <h1 className="mt-10 mx-10 text-3xl font-bold absolute top-0 left-0">Coin Toss</h1>
        <div className=" ">
          <div className={`h-[200px] w-[200px] bg-gray-300 rounded-full relative border border-gray-600 ${isFlipping?"animate-flip shadow-lg shadow-gray-600":"animate-none"}`}>
            <img className="absolute  font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" src={side} alt="coin-img"/>
          </div>
          <button className="btn-style w-full mt-4 " disabled={isFlipping} onClick={flipCoin}>{isFlipping?"Flipping":"Flip"}</button>
        </div>
      </main>
      </div> 
  )
};

export default Toss;
