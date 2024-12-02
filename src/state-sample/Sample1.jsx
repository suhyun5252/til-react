import { useState } from "react";

const Sample1 = () => {
  //할일 목록
  const [todoList, setTodosList] = useState([]);
  // 지금 입력중인 할일
  const [todo, setTodo] = useState("");
  const clickAdd = () => {
    // 목록을 만들어서 업데이트
    setTodosList([...todoList, todo]);
    setTodo("");
  };
  return (
    <div>
      <h1>입력내용 : {todo}</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => {
            setTodo(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={clickAdd}>할일추가</button>
        {todoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Sample1;
