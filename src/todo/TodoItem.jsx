import { useContext } from "react";
import { TodoDispatchContext } from "../context/todoStateContext";

// dispatch 로 delete, toggle
const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoDispatchContext);
  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? "line-throgh" : "none" }}
        onClick={() => {
          dispatch({ type: "toggle", payload: todo.id });
        }}
      >
        {todo.id}
        {todo.text}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "delete", payload: todo.id });
        }}
      >
        삭제
      </button>
    </div>
  );
};
export default TodoItem;
