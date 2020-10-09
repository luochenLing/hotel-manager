import React, { Suspense } from "react";
import { F7App } from "framework7-react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./theme";
import "css/App.scss";
import "framework7-icons";
import store from './redux/store'
import {Provider} from 'react-redux'
const Home = React.lazy(() => import("views/home/Index"));


function App() {
  return (
    <Suspense fallback="loading...">
      <Provider store={store}>
        <F7App>
          <HashRouter>
            <Switch>
              <Route path="/Home" exact component={Home}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </HashRouter>
        </F7App>
      </Provider>
    </Suspense>
  );
}

export default App;
