//8.6 useRef 연습~

import React from "react";
import AutoCounter from "./AutoCounter";
import Counter from "./Counter";
import ManualCounter from "./ManualCounter";
import UseRef from "./UseRef";

const App = () => {
  return (
    <div>
      <Counter />
      <AutoCounter />
      <ManualCounter />
      <UseRef />
    </div>
  );
};

export default App;
