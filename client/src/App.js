import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Login from "./components/Login";
import LobbyLogin from "./components/LobbyLogin";
import Users from "./components/Users/UsersContainer";
import Signup from "./components/Signup";
import NoMatch from "./components/pages/NoMatch";
import { VideoChatProvider } from "./utils/GlobalState";
// import logo from './logo.svg';
// import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios';
import Todos from './components/Todos/components/TodoList';
import EmployeeDirectory from './components/EmployeeDirectory/components/Main'
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Devices from "./components/Devices";
import PrivateRoute from "./components/PrivateRoute";
import TouchlessLogin from "./components/TouchlessLogin/TouchlessLoginUrl";
import EmployeeAppointments from './components/EmployeeAppointments/AppointmentsContainer';
import DTree from './components/DTree';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    setAuthenticated(true)
  }

  const deAuthenticate = () => {
    setAuthenticated(false)
  }

  const logout = () => {
    axios.get('/api/users/logout/1')
      .then(function (data) {
        deAuthenticate();
        window.location.reload();
      }).catch(function (err) {
        console.log(err);
      });
  }

  return (

    <Provider store={store}>
      <Router>
        <div>
          {/* <Nav /> */}
          <NavTabs authenticated={authenticated} logout={logout} />
          <Switch>
            <Route exact path={["/", "/home"]}>
              <Home />
            </Route>
            <Route exact path={["/", "/contact"]}>
              <Contact />
            </Route>
            <Route exact path="/touchlesslogin/:id" component={TouchlessLogin} />

            <Route exact path={["/devices"]} authenticated={authenticated} component={Devices} />

            <Route exact path={["/dtree"]} component={DTree} />

            <PrivateRoute exact path={["/devices"]} authenticated={authenticated} component={Devices} />
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
              <VideoChatProvider >
                <LobbyLogin />
              </VideoChatProvider>
            </Route>
            <Route exact path="/todos">
              <Todos />
            </Route>
            <Route exact path="/employeeappointments">
              <EmployeeAppointments />
            </Route>
            <Route exact path="/employeedirectory">
              <EmployeeDirectory />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
