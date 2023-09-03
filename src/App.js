import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import CloseButton from "react-bootstrap/CloseButton";
import { useEffect, useState } from "react";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currnetTodos) => {
      return [
        ...currnetTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="main-wrapper">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="form-wrapper">
              <form className="new" onSubmit={handleSubmit}>
                <h2>React Todo App</h2>
                <h4>Add new item</h4>
                <hr />
                <div className="item-wrapper"></div>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Add todo item"
                  onChange={(e) => setNewItem(e.target.value)}
                  value={newItem}
                />
                <Button
                  className="button add-button"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Add Item
                </Button>
              </form>
              <div className="todo-list">
                <h4>Todo list</h4>
                <hr />
                {todos.map((todo) => {
                  return (
                    <ListGroup
                      key={todo.id}
                      className={`${todo.completed ? "line-through" : ""}`}
                    >
                      <ListGroup.Item>
                        <Form.Check
                          checked={todo.completed}
                          onChange={(e) =>
                            toggleTodo(todo.id, e.target.checked)
                          }
                          id={`default-${todo.id} `}
                          label={`${todo.title} `}
                        />
                        <CloseButton
                          onClick={() => {
                            deleteTodo(todo.id);
                          }}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default App;
