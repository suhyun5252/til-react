import { useContext } from "react";
import { TodoStateContext } from "../context/todoStateContext";
import TodoItem from "./TodoItem";

// context state 에 변경된 내용 출력
const TodoList = () => {
  const todos = useContext(TodoStateContext);
  console.log(todos);
  return (
    <div>
      <h1>TodoList</h1>
      {todos.map(item => (
        <div key={item.id}>
          <TodoItem todo={item} />
        </div>
      ))}
    </div>
  );
};
export default TodoList;
