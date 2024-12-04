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
