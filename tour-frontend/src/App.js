import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTour from "./components/Tour/AddTour";
import { Provider } from "react-redux";
import store from "./store";
import UpdateTour from "./components/Tour/UpdateTour";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addTour" component={AddTour} />
          <Route exact path="/updateTour/:id" component={UpdateTour} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;