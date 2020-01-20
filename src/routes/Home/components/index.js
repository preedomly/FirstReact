import React from 'react';
import { connect } from 'dva';
import { Icon, Spin } from 'antd';
import logo from 'assets/images/logo.png';
import './style.less';
// import BaseComponent from 'components/BaseComponent';
import $$ from 'cmn-utils';

const btns = [
  {
    ks: 'log',
    title: '首页',
    url: 'http://www.baidu.com',
    icon: 'flag',
    info: '这个是百度',
    syle: 'none',
  },
  {
    ks: 'sp',
    title: '视频',
    url: 'http://v.hao123.baidu.com/',
    icon: 'hdd',
    info: '这个是视频',
    syle: 'none',
  },
  {
    ks: 'jhz',
    title: '结婚照',
    icon: 'eye',
    url: '',
    info: '暂时还没有路径的',
    syle: 'none',
  },
  {
    ks: 'zdy',
    title: '自定义信息',
    icon: 'file-ppt',
    url: '',
    info: '暂时没有路径',
    syle: 'none',
  },
]
@connect((state) => ({ ...state }))
export default class Home extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      Navigation: btns,
      page: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'home/queryNav',
      callback: res => {
        this.setState({ page : res[0].url})
      }
    });
  }

  handleNav = (res) => {
    const { Navigation } = this.props.home;
    Navigation.map(x => {
      if (x.ks === res.ks) {
        x.syle = '#80c0ef';
      } else x.syle = '#666'
    });
    this.setState({ Navigation, page: res.url, loading: true });
  }

  render() {
    // const user = $$.getStore('user');
    const { home: { Navigation = [] } } = this.props;
    const { page, loading } = this.state;
    return (
      <div className="home">
        <div className="home_cen">
          <Spin spinning={loading} className="home_ifm">
            <iframe src={page} frameBorder="0" align="middle" width="100%" height="100%" scrolling="yes" onLoad={() => { this.setState({ loading: false }) }} />
          </Spin>
        </div>
        <div className="home_bot">
          {
            Navigation.map(item => {
              return (
                <div key={JSON.stringify(item.ks)} onClick={() => this.handleNav(item)} className="home_nav" style={{ color: item.syle }}>
                  <Icon type={item.icon} />
                  <div>{item.title}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}