import { useEffect, useState } from "react";

const Todo = () => {
  const initData = {
    title: "",
    content: "",
  };
  // 화면 갱신용 state
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState(initData);

  // 내용 수정용 state
  const initPutData = {
    id: "",
    title: "",
    content: "",
  };
  const [putData, setPutData] = useState(initPutData);

  // 전체목록
  const getTodos = async () => {
    console.log("서버접속 후 전체 할일 가져옮");
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos`);
      const data = await res.json();
      //새로 리랜더링하라!
      setTodoList(data);
    } catch (error) {
      console.log(`에러입니다 : ${error}`);
      console.log(`잠시 후 다시 시도해주세요.`);
    }
  };
  // 상세내용보기
  // const getTodoDetail = async _id => {
  //   try {
  //     const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`);
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(`네트워크 오류입니다. ${error}`);
  //     console.log(`잠시 후 다시 시도해 주세요.`);
  //   }
  // };
  // 할일등록 1개
  const postTodo = async () => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("할일이 등록되었습니다.");
      getTodos();
      setFormData(initData);
    } catch (error) {
      console.log(`네트웍이 불안정합니다. ${error}`);
      console.log(`잠시후 다시 시도해 주세요.`);
    }
  };
  // 할일삭제 1개
  const deleteTodo = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`, {
        method: "DELETE",
      });
      alert("데이터가 성공적으로 삭제되었습니다");
      getTodos();
    } catch (error) {
      console.log(`네트워크 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 할일 1개의 내용 수정
  const putTodo = async () => {
    const { id, title, content } = putData;
    try {
      await fetch(`http://192.168.0.66:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      // 다시읽기
      getTodos();
    } catch (error) {
      console.log(`서버가 불안정합니다. ${error}`);
      console.log(`잠시 후 시도해주세요`);
    }
  };

  // 이벤트 핸들링
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = e => {
    // 웹브라우저 새로갱신 안되요.
    e.preventDefault();
    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    postTodo();
  };
  // 상세보기 핸들링
  // const handleClickDetail = _item => {
  //   setPutData({ ..._item });
  // };
  // 수정용 핸들링
  const handleChangePut = e => {
    const { name, value } = e.target;
    setPutData({ ...putData, [name]: value });
  };
  const handleSubmitPut = e => {
    // 아래가 없으면 새로 고침되면서 모든 임시 초기화 된다.
    // 반드시 필요.
    e.preventDefault();
    if (putData.title === "") {
      alert("제목이 필요합니다.");
      return;
    }
    if (putData.content === "") {
      alert("내용이 필요합니다.");
      return;
    }

    putTodo();
  };

  // 컴포넌트 보이면 최초 딱 한번 실행
  useEffect(() => {
    // 처음에 todo 로 이동하면, 할일 목록 전체 가져 옮
    getTodos();

    return () => {};
  }, []);
  return (
    <div>
      <h1>Todo 등록</h1>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label>제목</label>
            <input
              name="title"
              value={formData.title}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={e => handleChange(e)}
            ></textarea>
          </div>
          <div>
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
      <h2>상세보기</h2>
      <div>
        <form onSubmit={e => handleSubmitPut(e)}>
          <div>
            <label>선택한 제목</label>
            <input
              type="text"
              name="title"
              value={putData.title}
              onChange={e => handleChangePut(e)}
            />
          </div>
          <div>
            <label>선택한 내용</label>
            <textarea
              name="content"
              value={putData.content}
              onChange={e => handleChangePut(e)}
            ></textarea>
          </div>
          <div>
            <button type="submit">수정</button>
          </div>
        </form>
      </div>
      <h2>Todo List</h2>
      <div>
        {todoList.map(item => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              <button
                type="button"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                삭제
              </button>
              <button type="button" onClick={() => setPutData({ ...item })}>
                수정
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
