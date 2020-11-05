import { ComponentType, lazy, LazyExoticComponent } from 'react'
import { RouteConfig, RouteConfigComponentProps } from 'react-router-config'
const Home = lazy(() => import('views/home/Index'))
const Hotel = lazy(() => import('views/hotel/Index'))
// import Home from 'views/home/Index'
// import Hotel from 'views/hotel/Index'
//兼容懒加载属性，所以就加了个继承属性，这里可以兼容lazy的写法和常规引入写法
interface routeType extends RouteConfig{
  component:LazyExoticComponent<ComponentType<any>>|React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
}

const routes: routeType[] = [
  {
    path: '/home',
    component:Home,
    exact: true,
    
  },
  {
    path: '/hotel',
    component: Hotel,
    exact: true,
  },
  {
    path: '/',
    component: Hotel,
  },
  // 嵌套子路由children，这里说明一下不一定必须用children，你可以用其它的词代替
  // {
  //   path: '/advantage',
  //   component: FyAdvantage,
  //   children: [
  //     {
  //       path: '/advantage/advantage1',
  //       component: FyAdvantageOne,
  //     },
  //   ],
  // },
]

export { routes }
