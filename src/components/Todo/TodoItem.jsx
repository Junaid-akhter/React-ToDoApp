import { FaTrash, FaCheck } from "react-icons/fa";

function TodoItem({ todo, markDone, deleteTodo }) {
  return (
    <li className="todo-item" key={todo.id}>
      <div className="left" onClick={() => markDone(todo.id)}>
        <div className={todo.isDone ? "checkbox active" : "checkbox"}>
          {todo.isDone && <FaCheck />}
        </div>

        <span className={todo.isDone ? "completed" : ""}>{todo.task}</span>
      </div>

      <FaTrash className="trash" onClick={() => deleteTodo(todo.id)} />
    </li>
  );
}

export default TodoItem;
