/**
 * 封装路由
 */
import React, { Suspense, lazy, PureComponent } from "react";
import { connect } from "react-redux";
// 动态路由引入
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import routes from "./configs/routes.js";

// 自定义未能访问 --》 未有权限--》 访问失败等页面

const Exception = lazy(() =>
  import(/* webpackChunkName: "Exception" */ "./pages/Exception")
);

// 拦截器，是否登入-》 或者有权限是否登入等
function checkNotAllowed(menus, pathname) {
  let routerMenus = [];
  menus.forEach(menu => {
    const isRouter = !menus.some(item => item.pid === menu.id);
    if (isRouter) {
      routerMenus.push(menu);
    }
  });
  const isAllowed = routerMenus.some(item => pathname.indexOf(item.path) === 0);
  return !isAllowed && pathname !== "/" && pathname !== "/login";
}

class Router extends PureComponent {
  render() {
    const { menus } = this.props;
    return (
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            {routes.map(x => {
              if (x.redirect) {
                return (
                  <Redirect exact key={x.path} from={x.path} to={x.redirect} />
                );
              }
              return (
                <Route
                  exact
                  key={x.path}
                  path={x.path}
                  render={props => {
                    if (x.layout)
                      return (
                        <x.layout>
                          {" "}
                          <x.component {...props} />{" "}
                        </x.layout>
                      );
                    // 判断路由是否是可访问的菜单下的路由
                    const isNotAllowed = checkNotAllowed(menus, x.path);
                    return isNotAllowed ? (
                      <Exception type="403" />
                    ) : (
                      <x.component {...props} />
                    );
                  }}
                ></Route>
              );
            })}
            <Route render={() => <Exception />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default connect(state => {
  const {
    account: { menus }
  } = state;
  return { menus };
})(Router);
