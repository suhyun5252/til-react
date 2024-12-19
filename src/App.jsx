import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./context/UserInfoContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "Lee",
                    userName: "suhyun",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>{userInfo.userName}님 정보수정</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Footer = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <footer>하단{userInfo.userRole}</footer>;
};

const Main = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인을 하셔야 서비스를 이용합니다.</div>
      ) : (
        <div>
          <Character />
          <Friend />
          <Point />
          <Map />
          <FAQ />
        </div>
      )}
    </main>
  );
};

const Character = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div>
      <div>{userInfo.userName}님 캐릭터 변경 서비스</div>
      <ChoiceCharacter>캐릭터 종류 선택 서비스</ChoiceCharacter>
    </div>
  );
};
const ChoiceCharacter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 종류 선택 서비스</div>;
};
const Friend = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 친구관리 서비스</div>;
};
const Point = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 주포인트 구매 서비스</div>;
};
const Map = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 주변 지도안내 서비스</div>;
};
const FAQ = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 고객센터 QA 서비스</div>;
};

function App() {
  return (
    <UserInfoProvider>
      <Header />
      <Main />
      <Footer />
    </UserInfoProvider>
  );
}
export default App;
