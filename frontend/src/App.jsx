import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_all_todos")
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div>
      <h1>ToDo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;