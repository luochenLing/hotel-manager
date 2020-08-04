import React, { Suspense } from "react";
import { F7App } from "framework7-react";
// import routes from "./Route/route";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./theme";
import "css/App.scss";
import "framework7-icons";
const Home = React.lazy(() => import("views/home/Index"));
const Calendar = React.lazy(() => import("components/common/Calendar"));
function App() {
  return (
    <Suspense fallback="loading...">
      <F7App>
        <HashRouter>
          <Switch>
            <Route path="/Home" exact component={Home}></Route>
            {/* <Route path="/" component={Home}></Route> */}
            <Route path="/" component={Calendar}></Route>  
          </Switch>
        </HashRouter>
      </F7App>
    </Suspense>
  );
}

export default App;
