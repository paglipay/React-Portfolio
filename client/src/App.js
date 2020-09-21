import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Login from "./components/Login";
import LobbyLogin from "./components/LobbyLogin";
import Signup from "./components/Signup";
import NoMatch from "./components/pages/NoMatch";
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    setAuthenticated(true)
  }

  const deAuthenticate = () => {
    setAuthenticated(false)
  }

  const logout = () => {
    axios.get('/api/users/logout')
      .then(function (data) {
        this.deAuthenticate();
        window.location.reload();
      }.bind(this)).catch(function (err) {
        console.log(err);
      });
  }

  return (
    <Router>
      <div>
        {/* <Nav /> */}        
        <NavTabs authenticated={ authenticated } logout={logout}/>
        <Switch>
        <Route exact path="/login" render={props => 
            <Login
              {...props}
              authenticate={authenticate}
              deAuthenticate={deAuthenticate}
              authenticated={authenticated}
              logout={logout}
            />}
          />
          <Route exact path="/signup" render={props => 
            <Signup
              {...props}
              authenticate={authenticate}
              deAuthenticate={deAuthenticate}
              authenticated={authenticated}
              logout={logout}
            />} 
          />
          <Route exact path="/lobbylogin">
            <LobbyLogin />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
