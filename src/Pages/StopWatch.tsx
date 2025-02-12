import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";


const StopWatch = () => {
  const [isClockRunning, setIsClockRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [watch, setWatch] = useState({ hr: 0, min: 0, sec: 0 });

  useEffect(() => {
    return () => {
      if (intervalId)
        clearInterval(intervalId)
    };
  }, [intervalId]);

  const startClock = () => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
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

    setIntervalId(id);
    setIsClockRunning(true);
  };

  const stopClock = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsClockRunning(false);
  };

  const resetClock = () => {
    setIsClockRunning(false);
    setWatch({ hr: 0, min: 0, sec: 0 });
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

  };

  const handleClock = () => {
    if (isClockRunning) {
      stopClock();
    } else {
      startClock();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-200">
      <NavBar />
      <main className="flex-1 flex justify-center items-center relative">
        <h1 className="mt-10 mx-10 text-3xl font-bold absolute top-0 left-0">Stop Watch</h1>
        <div className="w-[20rem] h-[20rem] md:w-[30rem] bg-white rounded-lg shadow-lg shadow-gray-400">
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

          <div className="flex justify-center gap-4 mt-2">
            <button className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-400" onClick={resetClock}>Reset</button>
            <button className="btn-style" onClick={handleClock}>{isClockRunning ? "Stop" : "Start"}</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StopWatch;
