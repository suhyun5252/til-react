# Axios 활용

- https://axios-http.com/kr/docs/intro
- `npm install axios`

## 1. 기본 사용법

```jsx
import axios from "axios";
import { useState, useEffect } from "react";

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
      const res = await axios.get(API_URL);
      setMemberList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMember = async id => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMember = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getMembers();
      setFormData(initData);
    } catch (error) {
      console.log(error);
    }
  };
  const postMember = async item => {
    try {
      await axios.post(API_URL, item);
      getMembers();
      setFormData(initData);
    } catch (error) {
      console.log(error);
    }
  };
  const putMember = async item => {
    try {
      await axios.put(`${API_URL}/${item.id}`, item);
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

## 2. 예외 및 에러 처리

- 우리가 fetch 또는 axios를 활용해서 request 하면
- API 백엔드 서버는 response를 합니다.
  :

```json
{
  // `data`는 서버가 제공하는 응답입니다.
  "data": {},

  // `status`는 HTTP 상태 코드입니다.
  "status": 200,

  // `statusText`는 HTTP 상태 메시지입니다.
  "statusText": "OK",

  // `headers`는 HTTP 헤더입니다.
  // 모든 헤더 이름은 소문자이며, 괄호 표기법을 사용하여 접근할 수 있습니다.
  // 예시: `response.headers['content-type']`
  "headers": {},

  // `config`는 요청을 위해 `Axios`가 제공하는 구성입니다.
  "config": {},

  // `request`는 이번 응답으로 생성된 요청입니다.
  // 이것은 node.js에서 마지막 ClientRequest 인스턴스 입니다.
  // 브라우저에서는 XMLHttpRequest입니다.
  "request": {}
}
```

### 2.1 status 값 참조

- https://developer.mozilla.org/ko/docs/Web/HTTP/Status

```jsx
const getMembers = async () => {
  try {
    const res = await axios.get(API_URL);
    console.log(res.status);
    // 정상적으로 데이터의 결과가 있으므로
    //  api 회신의 값이 200번 대의 값은 성공
    const responseStatus = res.status.toString().charAt(0);
    if (res.status === "2") {
      setMemberList(res.data);
    } else {
      console.log("데이터가 없어요");
    }
  } catch (error) {
    // 만약 404 ,400번 대라면 내꺼 오타 확인하자!
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼졌어요");
    }
    if (errorStatus === "4") {
      alert("호출을 실패했습니다.");
    }
    console.log(error);
  }
};
```

### 2.2 백엔드 협업시 (예: axios,fetch 등) 코딩 컨벤션

- `/src/apis/` 폴더 생성 권장함
- `/src/apis/config.js` 파일 생성 권장

```
import axios from "axios";

export const API_URL = "http://localhost:5000/member";

export const axiosInstance = axios.create();


```

- `/src/apis/members.js` 기능별 담당 파일 생성

```
export const getMembers = async setFunc => {
  try {
    const res = await axiosInstance.get(API_URL);
    console.log(res.status);
    // 정상적으로 데이터의 결과가 있으므로
    //  api 회신의 값이 200번 대의 값은 성공
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      setFunc(res.data);
    } else {
      console.log("데이터가 없어요");
    }
  } catch (error) {
    // 만약 404 ,400번 대라면 내꺼 오타 확인하자!
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼졌어요");
    }
    if (errorStatus === "4") {
      alert("호출을 실패했습니다.");
    }
    console.log(error);
  }
};
```

- `/src/apis/todos.js` 기능별 담당 파일 생성
- `/src/apis/diary.js` 기능별 담당 파일 생성

## 2.3 package.json 수정(proxy)

- 수작업
- `"proxy" : 백엔드측의 ip 주소를 작성합니다.`

```
  "proxy": "http://192.168.0.66"
```

-Member.jsx

```jsx
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
              <button onClick={() => deleteMember(item.id, setMemberList)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
```

```js
// 삭제 기능
export const deleteMember = async (id, setMemberList) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    getMembers(setMemberList);
  } catch (error) {
    console.log(error);
  }
};
```

### 2.3 향후 시간이 지나면서 코드 고도화를 시도합니다.

- 1단계
  : API 호출과 화면갱신 즉, state 관리를 .jsx 에서 작성
- 2단계
  : API 호출을 별도 파일로 분리, state 관리도 옮겨보고
- 3단계
  : API 호출은 JS에서 진행, 그 결과를 return 받아 jsx에서 활용하도록 시도

```jsx
import axios from "axios";
import { useState, useEffect } from "react";
import { deleteMember, getMembers } from "../apis/members";

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

  const postMember = async item => {
    try {
      await axios.post(API_URL, item);
      callApiMember();
      setFormData(initData);
    } catch (error) {
      console.log(error);
    }
  };
  const putMember = async item => {
    try {
      await axios.put(`${API_URL}/${item.id}`, item);

      getMembers();
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 호출도 하면서 호출된 결과를 state 업데이트에 반영도하고
  const callApiMember = async () => {
    const result = await getMembers();
    setMemberList(result);
  };

  const callApiDelete = async id => {
    const result = await deleteMember(id);
    if (result === "success") {
      callApiMember();
    } else {
      alert("다시 시도하세요");
    }
  };

  useEffect(() => {
    callApiMember();
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
              <button
                onClick={() => {
                  callApiDelete(item.id);
                }}
              >
                삭제
              </button>
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

```js
import { API_URL, axiosInstance } from "./config";

export const getMembers = async () => {
  try {
    const res = await axiosInstance.get(API_URL);
    // console.log("결과 : ", res.status);
    // 정상적으로 데이터의 결과가 있으면
    // API 회신의 200 류의 값은 성공입니다.
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      return res.data;
    } else {
      console.log("데이터가 없어요.");
      return [];
    }
  } catch (error) {
    console.log("에러 : ", error);
    // 만약 404 라면 또는 400 류라면 `우리`를 의심하자.
    const errorStatus = error.response.status.toString().charAt(0);

    if (errorStatus === "5") {
      alert("서버가 꺼졌어요.");
    }
    if (errorStatus === "4") {
      alert("호출에 실패하였습니다.");
    }
    console.log(error);
    return [];
  }
};
// 삭제 기능
export const deleteMember = async id => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${id}`);
    // return res.status;
    return "success";
  } catch (error) {
    console.log(error);
    // return error.res.status;
    return "fail";
  }
};
```
