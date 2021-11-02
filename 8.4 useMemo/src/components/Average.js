// import React, { useState } from "react";

// //평균값계산식
// const getAverage = (numbers) => {
//   console.log("평균값계산중");
//   if (numbers.length === 0) return 0;
//   const sum = numbers.reduce((a, b) => a + b);
//   return sum / numbers.length;
// };

// const Average = () => {
//   const [list, setList] = useState([]);
//   const [number, setNumber] = useState("");

//   const onChange = (e) => {
//     setNumber(e.target.value);
//   };

//   const onInsert = (e) => {
//     const nextList = list.concat(parseInt(number));
//     setList(nextList);
//     setNumber("");
//   };

//   return (
//     <div>
//       <input value={number} onChange={onChange} />
//       <button onClick={onInsert}>등록</button>
//       <ul>
//         {list.map((value, index) => (
//           <li key={index}>{value}</li>
//         ))}
//       </ul>
//       <div>
//         <b>평균값:</b>
//         {getAverage(list)}
//       </div>
//     </div>
//   );
// };

// export default Average;
//8.4
//얘네는 input내용 수정할때도 getAverage함수 호출됨. 인풋 내용 바꿜때는 평균값다시 계산할 필요없으니 시간낭비
//useMemo 훅 사용하면 이런 작업 최적화할 수 있음

// import React, { useState, useMemo } from "react";

// //평균값계산식
// const getAverage = (numbers) => {
//   console.log("평균값계산중");
//   if (numbers.length === 0) return 0;
//   const sum = numbers.reduce((a, b) => a + b);
//   return sum / numbers.length;
// };

// const Average = () => {
//   const [list, setList] = useState([]);
//   const [number, setNumber] = useState("");

//   const onChange = (e) => {
//     setNumber(e.target.value);
//   };

//   const onInsert = (e) => {
//     const nextList = list.concat(parseInt(number));
//     setList(nextList);
//     setNumber("");
//   };
//   //유즈메모
//   const avg = useMemo(() => getAverage(list), [list]);
//   return (
//     <div>
//       <input value={number} onChange={onChange} />
//       <button onClick={onInsert}>등록</button>
//       <ul>
//         {list.map((value, index) => (
//           <li key={index}>{value}</li>
//         ))}
//       </ul>
//       <div>
//         <b>평균값:</b>
//         {avg}
//       </div>
//     </div>
//   );
// };

// export default Average;

//8.5 useCallback
//렌더링 최적화에 사용 이 훅을 사용하면
import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값계산중");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const inputEL = useRef(null);

  //callback
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); //컴포넌트가 처음 렌더링될때만 함수 생성
  //온체인지처럼 비어있는 배열 넣으면 컴포넌트가 렌더링될때 만들었던 함수 계속 재사용!

  //유즈컬백의 첫번째 파라미터는 생성하고 싶은 함수넣고, 두번째는 배열넣으면 됨.
  //이 배열에는 어떤 값이 바뀌었을때 함수를 새로 생성해야되는지 명시해야함.
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEL.current.focus();
  }, [number, list]); //number 혹은 list가 바뀌었을때만 함수 생성

  //유즈메모
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEL} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b>
        {avg}
      </div>
    </div>
  );
};

export default Average;
