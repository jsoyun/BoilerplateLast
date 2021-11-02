import React, { useState, useEffect } from "react";

const AutoCounter = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링...count:${count}`);
  useEffect(() => {
    const intervalId = setInterval(() => setCount((count) => count + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <p>자동카운트 : {count}</p>
    </div>
  );
};

export default AutoCounter;
