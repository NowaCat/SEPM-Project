import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTour from "./components/Tour/AddTour";
import { Provider } from "react-redux";
import store from "./store";
import UpdateTour from "./components/Tour/UpdateTour";
import AddLocation from "./components/Location/AddLocation";
import LocationDashboard from "./components/LocationDashboard";
import UpdateLocation from "./components/Location/UpdateLocation";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";
import SecuredRoute from "./securityUtils/secureRoute";
import UserDashboard from "./components/UserDashboard";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  console.log(decoded_jwtToken.exp - currentTime);
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {
            // Private Routes
          }
          <Switch>
            <SecuredRoute
              exact
              path="/locationDashboard"
              component={LocationDashboard}
            />
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addTour" component={AddTour} />
            <SecuredRoute exact path="/updateTour/:id" component={UpdateTour} />
            <SecuredRoute exact path="/addLocation" component={AddLocation} />
            <SecuredRoute exact path="/users" component={UserDashboard} />
            <SecuredRoute
              exact
              path="/updateLocation/:id"
              component={UpdateLocation}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
