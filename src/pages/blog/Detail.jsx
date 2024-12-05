import { useLocation, useParams } from "react-router-dom";

function Detail() {
  const location = useLocation();
  // console.log(location);
  const data = location.state;
  // console.log(data);

  const { id } = useParams();
  return (
    <div>
      /blog/<b>{id}</b> 블로그 상세 페이지(RestAPI 방식)
    </div>
  );
}

export default Detail;
