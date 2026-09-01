import { FaCheck } from "react-icons/fa";

function TodoHeader({ completedCount, totalCount, markDoneAll, progress }) {
  return (
    <>
      <div className="header">
        <div>
          <h2>My Tasks</h2>

          <p>
            {completedCount}
            {" / "}
            {totalCount}
            {" Completed"}
          </p>
        </div>

        <button
          className="mark-all"
          onClick={markDoneAll}
          title="Mark all completed"
        >
          <FaCheck />
        </button>
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
}

export default TodoHeader;
