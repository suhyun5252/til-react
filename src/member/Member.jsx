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
