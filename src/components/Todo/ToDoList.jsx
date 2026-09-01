import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

import "./ToDoList.css";

export default function ToDoList() {
  let [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }

    return [
      {
        task: "Sample Task",
        id: uuidv4(),
        isDone: false,
      },
    ];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  let markDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
    });
  };

  let markDoneAll = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      });
    });
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-app">
        <TodoHeader
          completedCount={todos.filter((todo) => todo.isDone).length}
          totalCount={todos.length}
          markDoneAll={markDoneAll}
          progress={
            todos.length === 0
              ? 0
              : (todos.filter((todo) => todo.isDone).length / todos.length) *
                100
          }
        />

        <TodoInput
          newTodo={newTodo}
          updateTodoValue={updateTodoValue}
          addNewTask={addNewTask}
        />

        <ul className="todo-list">
          {todos.length === 0 ? (
            <div className="empty">
              <h3>🎉</h3>

              <p>No tasks yet</p>

              <span>Add your first task above.</span>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                markDone={markDone}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
