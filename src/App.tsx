import React, { Suspense } from "react";
import { F7App } from "framework7-react";
import { BrowserRouter } from "react-router-dom";
import "./theme";
import "css/App.scss";
import "framework7-icons";
import store from "./redux/store";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { routes } from "./router";
// import { Provider as KeepAliveProvider } from "react-keep-alive";
// const Home = React.lazy(() => import('views/home/Index'))
// const Hotel = React.lazy(() => import('views/hotel/Index'))

function App() {
  return (
    <Suspense fallback="loading...">
      <Provider store={store}>
        <F7App>
          <BrowserRouter>
            {/* <KeepAliveProvider>{renderRoutes(routes)}</KeepAliveProvider> */}
            {/* <Switch> */}
            {/* <Route path='/home' exact component={Home}></Route>
              <Route path='/hotel' exact component={Hotel}></Route>
              <Route path='/' component={Home}></Route> */}
            {/* </Switch> */}
            {renderRoutes(routes)}
          </BrowserRouter>
        </F7App>
      </Provider>
    </Suspense>
  );
}

export default App;
