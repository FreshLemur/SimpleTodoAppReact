import { useState } from "react";
import "./styles.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [changeInput, setChangeInput] = useState({ text: "" });
  const [taskCompleted, setTaskCompleted] = useState(0);

  function addTask() {
    if (changeInput.text.trim() === "") {
      alert("Input field is clean, please write something");
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: changeInput.text, id: Date.now() },
      ]);
      setChangeInput({ text: "" });
    }
  }

  function inputChange(e) {
    setChangeInput({ text: e.target.value });
  }

  // function removeTask(id) {
  //   setTasks((prevTasks) =>
  //     prevTasks.filter((task) => {
  //       task.id !== id;
  //     })
  //   );
  // }
  // У цьому варіанті присутня помилка. Ви використовуєте блочну фігурнудужку {} для тіла функції filter,
  // але не вказали ключове слово return. Це призведе до того, що фільтр завжди повертатиме undefined, і в
  // результаті всі елементи будуть видалені.

  function removeTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function completedTask(id) {
    removeTask(id);
    setTaskCompleted(taskCompleted + 1);
  }

  return (
    <div>
      <header>TODO LIST</header>
      <main>
        <section className="section-add-task">
          <input
            type="text"
            placeholder="Add a task..."
            onChange={(e) => {
              inputChange(e);
            }}
            value={changeInput.text}
          />
          <button onClick={() => addTask()}> Add</button>
        </section>
        <br />
        <section className="section-with-todos">
          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <section className="toto-text-section">
                  <span>{task.text}</span>
                </section>
                <section>
                  <button
                    className="delete-task-btn"
                    onClick={() => removeTask(task.id)}
                  >
                    Х
                  </button>
                  <button
                    className="task-completed"
                    onClick={() => completedTask(task.id)}
                  >
                    Completed task
                  </button>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        Total Todos: {tasks.length} | Completed Todos: {taskCompleted}
      </footer>
    </div>
  );
}
