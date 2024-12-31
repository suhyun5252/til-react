import { useReducer } from "react";
import { CounterStateContext, CouterDispatchContext } from "./counterContext";
// 1. 기본값
const initialState = { count: 0 };
// 2. 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}
// Context Provider 생성
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterStateContext.Provider value={state}>
      <CouterDispatchContext.Provider value={dispatch}>
        {children}
      </CouterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}
