// 로그인에 관련된 코드를 모아둔다.
// 컴포넌트는 아니지만, use 훔들을 사용했다.
// 일반 함수에는 use 훅들을 사용 못 한다.
// 그렇다면 custom hook 만들어서 활용한다.

import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  // 사용자 정보
  const [data, setData] = useState(null);

  // 서버 에러
  const [error, setError] = useState(null);

  // 서버 연결중
  const [loading, setLoading] = useState(false);

  //   로그인 함수
  const login = async (id, pw) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", { id: id, pw: pw });
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { data, loading, error, isLogin, login };
};
