import React from 'react';
import { connect } from 'dva';
import { Switch, NavLink, routerRedux, HashRouter, Route, Redirect } from 'dva/router';
import $$ from 'cmn-utils';
import './styles/basic.less';

@connect()
export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    if (!$$.getStore('user')) {
      console.log(this.props);
      return this.props.dispatch(routerRedux.replace('/user/login'))
    }
    const user = $$.getStore('user');
    this.setState({ name: user.name });
  }

  render() {
    const { routerData: { childRoutes } } = this.props;
    const { name } = this.state;
    return (
      <div className="basic">
        {/* <div className="basic_page">
       
        </div> */}
        <Switch >
          {childRoutes}
        </Switch>
        {/* <div className="basic_Nav">
          <NavLink to="/home" activeClassName="active">首页</NavLink>
          <NavLink to="/userInfo" activeClassName="active">视频</NavLink>
          <NavLink to="/logins" activeClassName="active">菜单</NavLink>
          <NavLink to="/marriage" activeClassName="active">结婚照</NavLink>
          <NavLink to="/user" activeClassName="active">{name}</NavLink>
        </div> */}
      </div>
    );
  }
}