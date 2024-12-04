# fetch 로 REST API 연동해 보기

- `async...await` 로 비동기처리를 기준

## 1. 사전 조건은 백엔드 서버가 활성화 되어 있어야 한다.

- 터미널에 prompt 현재 폴더가 `server`여야 함
- `npm run start` 실행
- `192.168.0.66:5000`

## 2. fetch로 데이터 연동하기

- `jwt` 인증없이 진행인 경우
- `javascript web token` 을 말함
- /src/todos/ 폴더 생성
- /src/todos/Todo.jsx 파일 생성
- /src/main.jsx import하기

# fetch 로 REST API 연동해 보기

- `async ... await` 로 비동기처리를 기준

## 1. 사전 조건은 백엔드가 활성화 되어 있어야 해요.

- 터미널에 prompt 현재 폴더가 `server` 여야 함.
- `npm run start` 실행
- `http://192.168.0.66:5000/todos`
- `{"title":"" "content":""}`

## 2. fetch 로 데이터 연동하기

- `jwt` 인증없이 진행인 경우
- `javaScript web token` 을 말함.
- `/src/todos/` 폴더 생성
- `/src/todos/Todo.jsx` 파일 생성
- `/src/main.jsx` 임폴트

```jsx
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
  const getTodoDetail = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(`네트워크 오류입니다. ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
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
      alert("수정되었습니다.");
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
  const handleClickDetail = _item => {
    setPutData({ ..._item });
  };
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
```

```jsx
import { useState } from "react";
import { useEffect } from "react";

const Member = () => {
  const API_URL = "http://localhost:5000/member";
  // member 목록 관리
  const [memberList, setMemberList] = useState([]);
  // 서버에 등록할 데이터 관리
  const initData = { email: "", pw: "" };
  const [formData, setFormData] = useState(initData);
  // 선택된 멤버 관리
  const selectData = { id: "", email: "", pw: "" };
  const [selectUser, setSelectUser] = useState(selectData);
  // 현재 선택된 멤버 수정 중 ?
  const [isEdit, setIsEdit] = useState(false);
  const handleChangeEdit = e => {
    const { name, value } = e.target;
    setSelectUser({ ...selectUser, [name]: value });
  };
  const handleSubmitEdit = e => {
    // 웹브라우저 새로고침 방지
    e.preventDefault();
    putMember({ ...selectUser });
  };

  // 이벤트 핸들러 함수
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = e => {
    // 웹브라우저 새로고침 방지
    e.preventDefault();
    postMember({ ...formData });
  };
  //   API 메서드
  const getMembers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMemberList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMember = () => {};
  const deleteMember = async id => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      getMembers();
    } catch (error) {
      console.log(error);
    }
  };
  const postMember = async item => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      getMembers();
      setFormData(initData);
    } catch (error) {
      console.log(error);
    }
  };
  const putMember = async item => {
    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      getMembers();
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
    return () => {};
  }, []);
  return (
    <div>
      <h1>Member 관리</h1>
      <div>
        {memberList.map(item => {
          return (
            <div key={item.id}>
              <div
                onClick={() => setSelectUser({ ...item })}
                style={{ cursor: "pointer", backgroundColor: "yellow" }}
              >
                {item.id} {item.email}
              </div>
              <button onClick={() => deleteMember(item.id)}>삭제</button>
            </div>
          );
        })}
      </div>
      <h2>새 멤버 추가</h2>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          이메일
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={e => handleChange(e)}
          />
          <br />
          비번
          <input
            type="password"
            name="pw"
            value={formData.pw}
            onChange={e => handleChange(e)}
          />
          <br />
          <button type="submit">회원가입</button>
        </form>
      </div>
      <h3>상세 회원정보</h3>
      {selectUser?.id !== "" ? (
        <div>
          <form onSubmit={e => handleSubmitEdit(e)}>
            이메일
            <input
              type="email"
              name="email"
              value={selectUser.email}
              readOnly={!isEdit}
              disabled={!isEdit}
              onChange={e => handleChangeEdit(e)}
            />
            <br />
            비번
            <input
              type="password"
              name="pw"
              value={selectUser.pw}
              readOnly={!isEdit}
              disabled={!isEdit}
              onChange={e => handleChangeEdit(e)}
            />
            <br />
            {isEdit ? (
              <>
                <button type="submit">정보 수정 등록</button>
                <button type="button" onClick={() => setIsEdit(false)}>
                  정보 수정 취소
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEdit(true)}>
                정보수정
              </button>
            )}
          </form>
        </div>
      ) : (
        "선택된 회원이 없습니다."
      )}
    </div>
  );
};

export default Member;
```
