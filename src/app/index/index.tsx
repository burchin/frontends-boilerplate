import React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Button } from 'antd-mobile';
import Store from './store';

import Style from './style.scss';

@observer
class User extends React.Component {
  store = new Store();
  componentDidMount() {
    this.store.finishInit();
  }
  render() {
    return (
      this.store.init && (
        <div className={Style.font}>
          {this.store.name}
          <Button type="primary" onClick={this.store.setName.bind(this)}>
            测试
          </Button>
        </div>
      )
    );
  }
}

render(<User />, document.getElementById('root'));
