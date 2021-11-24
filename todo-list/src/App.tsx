import React from "react";
import { NavBar } from './component/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom';
import { TodoList } from "./component/TodoList";
import HomePage from "./features/HomePage";
import { LoginPage } from "./features/LoginPage";
import { RootStateOrAny, useSelector } from "react-redux";
import { PrivateRouter } from './features/PrivateRouter'

function App() {

  const state = useSelector((state: RootStateOrAny) => state.user.user);

  // console.log(state);

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage> </HomePage>
        </Route>
        <PrivateRouter path="/TodoList">
          <TodoList />
        </PrivateRouter>

        <Route exact path="/SignIn">
          {
            state ? <Redirect to="/TodoList" /> : <LoginPage />
          }
        </Route>
      </Switch>
    </>
  );
}

export default App;
