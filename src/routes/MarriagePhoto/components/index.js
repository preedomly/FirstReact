import React from 'react';
import { connect } from 'dva';
import './style.less';
import $$ from 'cmn-utils';

@connect()
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jps: [],
    }
  }

  componentDidMount() {
    const ticks = [];
    for (let i = 0; i < 49; i++) {
      ticks.push(require(`./img/${i}.JPG`));
    }
    this.setState({ jps: ticks })
  }

  closeNotice = () => {
    this.close && this.close();
  }

  render() {
    const user = $$.getStore('user');
    const { jps } = this.state;
    return (
      <div className="page">
        {
          jps.map(item => {
            return <img key={JSON.stringify(item)} src={item} />
          })
        }
      </div>
    )
  }
}