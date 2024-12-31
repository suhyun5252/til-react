import { useContext, useState } from "react";
import { TodoDispatchContext } from "../context/todoStateContext";

// dispatch 를 이용해서 state 를 업데이트함
const TodoAdd = () => {
  const dispatch = useContext(TodoDispatchContext);
  const [text, setText] = useState("");
  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: "add", payload: text })}>
        추가
      </button>
    </div>
  );
};
export default TodoAdd;
