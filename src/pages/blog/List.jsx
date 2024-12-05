import { useSearchParams } from "react-router-dom";

const List = () => {
  // Search Params 데이터 내용 출력하기
  const [searchParams, setSearchParams] = useSearchParams();

  //   개별 데이터 뜯기
  const id = searchParams.get("id");
  const cate = searchParams.get("cate");
  return (
    <div>
      /blog/list?id={id}&cate={cate} 블로그 목록 (query string)
    </div>
  );
};

export default List;
