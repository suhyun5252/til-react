import { createRoot } from "react-dom/client";
import "./index.css";
import Todo from "./todos/Todo";

createRoot(document.getElementById("root")).render(
  <>
    <Todo />
  </>,
);
