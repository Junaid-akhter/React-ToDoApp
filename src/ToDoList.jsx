import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDoList.css";
import {
    FaTrash,
    FaArrowUp,
    FaCheck,
} from "react-icons/fa";

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
        setTodos((prevTodos)=>{
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) =>prevTodos.filter((todo) => todo.id != id));
    };

    // let upperCaseAll = () => {
    //     setTodos((prevTodos) => {
    //         return prevTodos.map((todo) => {
    //             return {
    //                 ...todo, 
    //                 task: todo.task.toUpperCase(),
    //             };
    //         });
    //     });
    // };

    // let upperCaseOne = (id) => {
    //     setTodos((prevTodos) => {
    //         return prevTodos.map((todo) => {
    //             if(todo.id == id) {
    //                 return {
    //                     ...todo, 
    //                     task: todo.task.toUpperCase(),
    //                 };
    //             } else {
    //                 return todo;
    //             }
    //         });
    //     });
    // }

    let markDone = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id == id) {
                    return {
                        ...todo, 
                        isDone: !todo.isDone,
                    };
                } else {
                    return todo;
                }
            });
        });       

        
    }

    let markDoneAll = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                return {
                    ...todo, 
                    isDone: true,
                };
            });
        });
    }

    return (
        <div className="todo-wrapper">

            <div className="todo-app">

                <div className="header">

                    <div>
                        <h2>My Tasks</h2>

                        <p>
                            {todos.filter(todo => todo.isDone).length}
                            {" / "}
                            {todos.length}
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

                    <div
                        className="progress-fill"
                        style={{
                            width: `${
                                todos.length === 0
                                    ? 0
                                    : (todos.filter(todo => todo.isDone).length / todos.length) * 100
                            }%`,
                        }}
                    ></div>

                </div>

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

                    <button
                        className="add-btn"
                        onClick={addNewTask}
                        title="Add task"
                    >
                        <FaArrowUp />
                    </button>

                </div>

                <ul className="todo-list">

                    {todos.length === 0 ? (

                        <div className="empty">

                            <h3>🎉</h3>

                            <p>No tasks yet</p>

                            <span>Add your first task above.</span>

                        </div>

                    ) : (

                        todos.map((todo) => (

                            <li
                                className="todo-item"
                                key={todo.id}
                            >

                                <div
                                    className="left"
                                    onClick={() => markDone(todo.id)}
                                >

                                    <div className={todo.isDone ? "checkbox active" : "checkbox"}>

                                        {todo.isDone && <FaCheck />}

                                    </div>

                                    <span className={todo.isDone ? "completed" : ""}>

                                        {todo.task}

                                    </span>

                                </div>

                                <FaTrash
                                    className="trash"
                                    onClick={() => deleteTodo(todo.id)}
                                />

                            </li>

                        ))

                    )}

                </ul>

            </div>

        </div>
    );

    // return(
    //     <div>
    //         <input placeholder="Add a task" value={newTodo} onChange={updateTodoValue}></input>
    //         <button onClick={addNewTask}>Add</button>
    //         <br></br>
    //         <br></br>
            

    //         <hr></hr>
    //         <h4>ToDo List</h4>
    //         <ul>
    //             {
    //                 todos.map((todo) => (
    //                     <li key={todo.id}>
    //                         <span style={todo.isDone ? { textDecorationLine: "line-through" }: {}}>
    //                             {todo.task}
    //                         </span> &nbsp;
    //                         <button onClick={() => deleteTodo(todo.id)}>DEL</button> &nbsp;
    //                         {/* <button onClick={() => upperCaseOne(todo.id)}>UCO</button> &nbsp; */}
    //                         <button onClick={() => markDone(todo.id)}>DONE</button>
    //                     </li>
    //                 ))
    //             }
    //         </ul>
    //         <br></br>
    //         {/* <button onClick={upperCaseAll}>UCA</button> &nbsp; */}
    //         <button onClick={markDoneAll}>DONE ALL</button>
    //     </div>
    // );




}