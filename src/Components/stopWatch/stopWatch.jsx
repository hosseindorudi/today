import React, { useEffect, useImperativeHandle, useState } from 'react'
const Stopwatch =React.forwardRef(({running},ref) => {
    const [time, setTime] = useState(0);
    // const [running, setRunning] = useState(false);
    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    useImperativeHandle(ref, () => ({getMyState: () => {return time}}), [time]);
    return (
      <div className="stopwatch">
        <div className="numbers">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
    );
  });

  export default Stopwatch