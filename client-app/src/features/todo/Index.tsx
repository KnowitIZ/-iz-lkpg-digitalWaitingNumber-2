import { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { Creator } from "./Creator";
import { Row } from "./Row";
import { VisibilityControl } from "./VisibilityControl";

export const Index = () => {
  const todoItemsInit = [
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false },
  ];

  const [userName, setUserName] = useState("Adam");
  const [newItemText, setNewItemText] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // const updateNewTextValue = (event) => {
  //   setNewItemText(event.target.value);
  // };

  const createNewTodo = (task) => {
    if (
      task.trim() !== "" &&
      todoItems.find((item) => item.action === task) === undefined
    ) {
      const newList = [...todoItems, { action: task, done: false }];
      setTodoItems(newList);
      localStorage.setItem("todos", JSON.stringify(newList));
    }
  };

  const toggleTodo = (todo) =>
    setTodoItems(
      todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );

  const todoTableRows = (doneValue) =>
    todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <Row key={item.action} item={item} callback={toggleTodo} />
      ));

  useEffect(() => {
    setUserName("Adam");
    setNewItemText("");
    setShowCompleted(true);

    let data = localStorage.getItem("todos");
    console.log(data);
    if (data) {
      setTodoItems(JSON.parse(data));
    } else {
      localStorage.setItem("todos", JSON.stringify(todoItemsInit));
      setTodoItems(todoItemsInit);
    }
  }, []);

  return (
    <div>
      <Banner name={userName} tasks={todoItems} />
      <div className="container-fluid">
        <Creator callback={createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{todoTableRows(false)}</tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};
