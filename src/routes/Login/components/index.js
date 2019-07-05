import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Tooltip, Icon, message } from "antd";
import './style.less';

const { Item: FormItem } = Form;
const { Password: InputPassword } = Input;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
@Form.create()
export default class Login extends Component {
  // onLogin = () => {
  //   this.props.dispatch({
  //     type: 'login/login',
  //     payload: {
  //       name: document.querySelector("#name").value,
  //       password: document.querySelector("#password").value,
  //     }
  //   })
  // }

  componentDidMount() {
    message.success('欢迎您登入!');
  }

  handleSubmit = (e) => {
    const { form: { validateFields }, dispatch } = this.props;
    e.preventDefault()
    validateFields((err, val) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: { userName: val.username, password: val.password, }
        })
      }
    })
  }

  render() {
    const { loading, login, form: { getFieldDecorator } } = this.props;
    const { loggedIn, message } = login;
    return (
      <div className="login">
        <div>
          <Form onSubmit={this.handleSubmit} className="login_root">
            <div className="login_title">小芹专属APP</div>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "输入你的账号名称！" }]
              })(
                <Input
                  size="large"
                  placeholder="账号名称"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  suffix={
                    <Tooltip title="名称：admin 密码：admin">
                      <Icon
                        type="info-circle"
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "输入你的账号密码！" }]
              })(
                <InputPassword
                  size="large"
                  placeholder="账号密码"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login_submit"
              >
                登录
            </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}