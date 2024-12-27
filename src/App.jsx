import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";

function App() {
  const { count, add, minus } = useCount(100);
  const {data, error, loading }=useAxios();
  const {data, error, loading, isLogin, login }=useLogin();
  const windowSize = useComponent();
  }useAxios();
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}
export default App;
