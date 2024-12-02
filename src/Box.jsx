import { useState } from "react";

const Box = () => {
  console.log("state 만들어짐");
  const [age, setAge] = useState(0);
  let baby = 3;

  const click = () => {
    const temp = age + 1;
    setAge(temp);
    baby = baby + 1;

    console.log(temp, baby);
  };

  return (
    <div>
      <button onClick={click}>클릭</button>
    </div>
  );
};

export default Box;
