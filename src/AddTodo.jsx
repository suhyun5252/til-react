import React, { useState } from "react";

const AddTodo = React.memo(({ addTodo }) => {
  console.log("AddTodo 리랜더링");
  const [text, setText] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <div>
      <h3>할일 추가 </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
});
export default AddTodo;
