import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// components
import { Restaurants } from "./containers/Restaurants.jsx";
import { Foods } from "./containers/Foods.jsx";
import { Orders } from "./containers/Orders.jsx";

function App() {
  return (
      <Router>
        <Switch>
          <Route
              exact
              path="/restaurants">
            <Restaurants />
          </Route>
          <Route
              exact
              path="/foods">
            <Foods />
          </Route>
          <Route
              exact
              path="/orders">
            <Orders />
          </Route>
            {/* コンポーネントにmatchというpropsを渡しながら、設定したPATHに対応するリクエストがあった場合にパラメーターと一緒にコンポーネントをレンダリングする */}
          <Route
              exact
              path="/restaurants/:restaurantsId/foods"
              render={({ match }) =>
                  <Foods
                      match={match}
                  />
              }
          />
        </Switch>
      </Router>
  );
}

export default App;
