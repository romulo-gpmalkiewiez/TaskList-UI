import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginPage from "./pages/login";
import TasksPage from "./pages/tasks";

import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tasks">
                    <TasksPage />
                </Route>
                <Route path="/">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
