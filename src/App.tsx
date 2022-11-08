import React, { useState, useRef } from "react";
import "./App.css";
interface headerData {
  children: string;
}

function Header({ children }: headerData) {
  return (
    <header className="header">
      <h1>{children}</h1>
    </header>
  );
}
function ListToDo({
  data,
  setData
}: {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function deleteOneTodos(id: number) {
    setData(data.filter((i, index) => id !== index));
  }
  return (
    <ul className="todo-list">
      {data.map((i, index) => (
        <li key={`toDo_item_${index}`}>
          {i}
          <span onClick={() => deleteOneTodos(index)}>x</span>
        </li>
      ))}
    </ul>
  );
}
function App() {
  const [todoList, settodoList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Header>Todo List</Header>
      <section className="main">
        <div style={{ display: "flex", width: "100%" }}>
          <input
            ref={inputRef}
            placeholder="Add new todo"
            onKeyDown={e => {
              if (
                e.keyCode === 13 &&
                inputRef.current &&
                inputRef.current.value
              ) {
                settodoList([...todoList, inputRef.current.value]);
                inputRef.current.value = "";
              }
            }}
          ></input>
          <button
            onClick={() => {
              if (inputRef.current && inputRef.current.value) {
                settodoList([...todoList, inputRef.current.value]);
                inputRef.current.value = "";
              }
            }}
          >
            Add
          </button>
        </div>
        <ListToDo data={todoList} setData={settodoList} />
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <button onClick={() => settodoList([])}>Clear</button>
        </div>
      </section>
    </div>
  );
}

export default App;
