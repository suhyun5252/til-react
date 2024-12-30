import { useReducer } from "react";
import { countReducer } from "../../modules/counter/countReducer";
import { countInitialState } from "../../modules/counter/countInitialState";
import { add, minus, reset } from "../../modules/counter/countActions";

const Counter = () => {
  const [countState, dispatch] = useReducer(countReducer, countInitialState);
  return (
    <div>
      <h1>Counter : {countState.count}</h1>
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>리셋</button>
    </div>
  );
};
export default Counter;
