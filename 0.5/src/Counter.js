import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링...count:${count}`);

  return (
    <>
      <p>{count}번 클릭하셨습니다</p>
      <button onClick={() => setCount((count) => count + 1)}>클릭</button>
    </>
  );
};

export default Counter;
