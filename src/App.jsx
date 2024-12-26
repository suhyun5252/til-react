import { useMemo } from "react";
import { useState } from "react";

function App() {
  // 데이터를 정렬
  const [sortBy, setSortBy] = useState("name");
  // 데모 데이터
  const data = [
    { id: 1, name: "Dbc", age: 40 },
    { id: 2, name: "Ccc", age: 25 },
    { id: 3, name: "Bbc", age: 35 },
  ];
  // 복잡한 연산을 매번 실행하지 않고, sortBy가 변화한 경우에만 정렬하고 싶다.
  const sortData = useMemo(() => {
    console.log("정렬함", sortBy);
    // 아래 sort 구문은 조건에 따라서 true, false를 반복하면서 순서배치 진행
    // a[sortBy]는 a["name"]>b["name"]
    return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [sortBy]);
  console.log(sortData);
  return (
    <div>
      <h1>배열의 속성을 이용한 정렬</h1>
      <div>
        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
          }}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortData.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
