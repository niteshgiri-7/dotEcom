import { useEffect, useRef, useState } from "react";
import NavBar from "../../Components/admin/NavBar";

const StopWatch = () => {
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [watch, setWatch] = useState({ hr: 0, min: 0, sec: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startClock = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setWatch((prev) => {
        let updateSec = prev.sec + 1,
          updateMin = prev.min,
          updateHr = prev.hr;

        if (updateSec > 59) {
          updateSec = 0;
          updateMin += 1;
        }

        if (updateMin > 59) {
          updateMin = 0;
          updateHr += 1;
        }

        return { hr: updateHr, min: updateMin, sec: updateSec };
      });
    }, 1000);

    setIsClockRunning(true);
  };

  const stopClock = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsClockRunning(false);
  };

  const resetClock = () => {
    stopClock();
    setWatch({ hr: 0, min: 0, sec: 0 });
  };

  return (
    <div className="flex h-screen w-screen bg-gray-200">
      <NavBar />
      <main className="flex-1 flex justify-center items-center relative">
        <h1 className="mt-10 mx-10 text-3xl font-bold absolute top-0 left-0">Stop Watch</h1>
        <div className="w-[20rem] h-[25rem] md:w-[30rem] bg-white rounded-lg shadow-lg shadow-gray-400">
          <div className="flex gap-3 h-[80%]">
            <div className="w-[30%] flex justify-center items-center">
              <strong className="w-[90%] text-center text-6xl">{watch.hr}</strong>
              <span className="ml-auto text-4xl">:</span>
            </div>
            <div className="w-[30%] flex justify-center items-center">
              <strong className="w-[90%] text-center text-6xl">{watch.min}</strong>
              <span className="ml-auto text-4xl">:</span>
            </div>
            <div className="w-[30%] flex justify-center items-center">
              <strong className="w-[90%] text-center text-6xl">{watch.sec}</strong>
            </div>
          </div>
          <hr className="h-1 bg-gray-200"></hr>
          <div className="flex justify-center gap-4 my-5 h-10">
            <button className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-400" onClick={resetClock}>
              Reset
            </button>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-400" onClick={isClockRunning ? stopClock : startClock}>
              {isClockRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StopWatch;
