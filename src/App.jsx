import Counter from "./components/counter/Counter";
import { TodoProvider } from "./context/todoProvider";
import TodoAdd from "./todo/TodoAdd";
import TodoList from "./todo/TodoList";

// 아래의 PRovide 에 의해서 state, dispatch 접근가능해짐
function App() {
  return (
    <TodoProvider>
      <TodoAdd />
      <TodoList />
    </TodoProvider>
  );
}
export default App;
