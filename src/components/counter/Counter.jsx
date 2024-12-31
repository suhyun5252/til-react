import { useContext } from "react";
import {
  CounterStateContext,
  CouterDispatchContext,
} from "../../context/counterContext";

function Counter() {
  // 앱 전체 context state 용도
  const state = useContext(CounterStateContext);
  // 앱 전체 context disoatch 용도
  const dispatch = useContext(CouterDispatchContext);
  return (
    <div>
      <h1>Counter : {state.count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>증가</button>
      <button onClick={() => dispatch({ type: "minus" })}>감소</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}
export default Counter;
