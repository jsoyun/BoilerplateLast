import React, { useState, useRef } from "react";

const ManualCounter = () => {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);
  console.log(`렌더링...count:${count}`);

  const startCounter = () => {
    intervalId.current = setInterval(
      () => setCount((count) => count + 1),
      1000
    );
    console.log(`시작...intervalId:${intervalId.current}`);
  };

  const stopCounter = () => {
    clearInterval(intervalId.current);
    console.log(`정지...intervalId: ${intervalId.current}`);
  };

  return (
    <div>
      <p>자동카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </div>
  );
};

export default ManualCounter;
