import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  console.log("TodoItem 리랜더링 : ", todo.text);
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </div>
  );
};

export default React.memo(TodoItem);
