import React, { useState } from "react";
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
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import Todos from "./components/Todos/components/TodoList";
import EmployeeDirectory from "./components/EmployeeDirectory/components/Main";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Devices from "./components/Devices";
import Members from "./components/pages/Members";
import PrivateRoute from "./components/PrivateRoute";
import TouchlessLogin from "./components/TouchlessLogin/TouchlessLoginUrl";
import EmployeeAppointments from "./components/EmployeeAppointments/AppointmentsContainer";
import DTree from "./components/DTree";
// import DynamicForm from './components/DTree/DynamicForm';
import AiChat from "./components/AiChat/AiChat";
import Navbar from "./components/SideNavBar/Navbar";
// import ReactChatWindow from "./components/ReactChatWindow/ReactChatWindow";
import { ChatWidget } from "@papercups-io/chat-widget";
import { Storytime } from "@papercups-io/storytime";

const st = Storytime.init({
  accountId: "92f19e78-dace-4d8a-a700-2b089cda13e4",

  // Optionally pass in metadata to identify the customer
  // customer: {
  //  name: 'Test User',
  //  email: 'test@test.com',
  //  external_id: '123',
  // },

  // Optionally specify the base URL
  baseUrl: "https://app.papercups.io",
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    setAuthenticated(true);
  };

  const deAuthenticate = () => {
    setAuthenticated(false);
  };

  const logout = () => {
    axios
      .get("/api/users/logout/1")
      .then(function (data) {
        deAuthenticate();
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* <Nav /> */}
          <NavTabs authenticated={authenticated} logout={logout} />
          {/* <Navbar /> */}
          <Switch>
            <Route exact path={["/", "/home"]}>
              <Home />
              {/* <ReactChatWindow /> */}
              <ChatWidget
                // `accountId` is used instead of `token` in older versions
                // of the @papercups-io/chat-widget package (before v1.2.x).
                // You can delete this line if you are on the latest version.
                // accountId="b5200b14-be9d-4915-aa64-f514fb2c6ad5"
                token="b5200b14-be9d-4915-aa64-f514fb2c6ad5"
                inbox="66180fcb-f6bf-49a6-934f-098ddc0a94c4"
                title="Welcome to Paglipay"
                subtitle="Ask us anything in the chat window below 😊"
                primaryColor="#1890ff"
                newMessagePlaceholder="Start typing..."
                showAgentAvailability={false}
                agentAvailableText="We're online right now!"
                agentUnavailableText="We're away at the moment."
                requireEmailUpfront={false}
                iconVariant="outlined"
                baseUrl="https://papercups.paglipay.info"
                // Optionally include data about your customer here to identify them
                // customer={{
                //   name: __CUSTOMER__.name,
                //   email: __CUSTOMER__.email,
                //   external_id: __CUSTOMER__.id,
                //   metadata: {
                //     plan: "premium"
                //   }
                // }}
              />
            </Route>
            <Route exact path={["/", "/contact"]}>
              <Contact />
              {/* <ReactChatWindow /> */}
            </Route>
            <Route
              exact
              path="/touchlesslogin/:id"
              component={TouchlessLogin}
            />

            <Route
              exact
              path={["/devices"]}
              authenticated={authenticated}
              component={Devices}
            />

            <Route
              exact
              path={["/members"]}
              // authenticated={authenticated}
              component={Members}
            />

            <Route exact path={["/dtree"]} component={DTree} />

            <PrivateRoute
              exact
              path={["/devices"]}
              authenticated={authenticated}
              component={Devices}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  authenticate={authenticate}
                  deAuthenticate={deAuthenticate}
                  authenticated={authenticated}
                  logout={logout}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  authenticate={authenticate}
                  deAuthenticate={deAuthenticate}
                  authenticated={authenticated}
                  logout={logout}
                />
              )}
            />
            <Route exact path="/lobbylogin">
              <VideoChatProvider>
                <LobbyLogin />
              </VideoChatProvider>
            </Route>
            <Route exact path="/todos">
              <Todos />
            </Route>
            <Route exact path="/dynamicform">
              <AiChat />
              
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
