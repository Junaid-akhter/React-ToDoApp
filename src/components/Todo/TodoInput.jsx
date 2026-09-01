import { FaArrowUp } from "react-icons/fa";

function TodoInput({ newTodo, updateTodoValue, addNewTask }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={updateTodoValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") addNewTask();
        }}
      />

      <button className="add-btn" onClick={addNewTask} title="Add task">
        <FaArrowUp />
      </button>
    </div>
  );
}

export default TodoInput;
