import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3 && name.length > 0) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ name, todo: content }),  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setName("");
      setTodos([...todos, newTodo]);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    };

    getTodos();
  }, []);

  return (
    <main className="container">
      <h1 className="title">My Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name..."
            className="form__input"
            required 
          />
        </div>
        <div>
          <label htmlFor="content">Todo:</label>
          <input 
            type="text" 
            id="content"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Enter a new todo..."
            className="form__input"
            required 
          />
        </div>
        <button className="btn1" type="submit">Add Todo</button>
      </form>
      <div className="todos">
        {(todos.length > 0) &&
          todos.map((todo) => (
            <Todo todo={todo} setTodos={setTodos} key={todo._id} />
          ))
        }
      </div>
    </main>
  );
}
