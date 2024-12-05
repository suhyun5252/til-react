import { Link, useLocation, useNavigate } from "react-router-dom";

function Index({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const goBlog = item => {
    // navigate(`/blog/${item.id}`);

    const 숨긴정보 = {
      memo: "제품페이지에서 왔어요.",
      good: "제품 1번을 보고 있었지요.",
      favorite: "제품 1에 관심이 많네요.",
    };

    navigate(
      {
        pathname: `/blog/${item.id}`,
        search: "?hi=5",
      },
      { state: { 숨긴정보 } },
    );
  };
  return (
    <div>
      <h1>/blog 블로그 첫페이지</h1>
      {/* 목록 */}
      <ul>
        {data.map(item => {
          return (
            <li key={item.id}>
              <div>
                {item.title}{" "}
                <button>
                  <Link to={`/blog/${item.id}`}>상세 이동</Link>
                </button>
                <button
                  onClick={() => {
                    navigate(`/blog/${item.id}`);
                  }}
                >
                  쿼리가기
                </button>
                <button
                  onClick={() => {
                    goBlog(item);
                  }}
                >
                  state까지 쿼리가기
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
