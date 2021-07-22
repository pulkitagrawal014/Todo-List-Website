import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  const [filterResult, setFilterResult] = useState(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilterResult(todos)
  }, [todos]);

  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const onFilter = (event) => {
    var searchText = event.target.value.toLowerCase()
    setFilterResult(
      todos.filter((e) => {
        return e.title.toLowerCase().includes(searchText);
      })
    );

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } 
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} onFilter={onFilter} />
         <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={filterResult} onDelete={onDelete} />
              </>
            );
          }}
          ></Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
export default App;
