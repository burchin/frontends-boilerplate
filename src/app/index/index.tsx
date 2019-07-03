import React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Button } from 'antd-mobile';
import Store from './store';

import Style from './style.scss';

@observer
class User extends React.Component {
  store = new Store();

  render() {
    return (
      <div className={Style.font}>
        {this.store.logining}
        <Button type="primary" onClick={this.store.test.bind(this)}>aaa</Button>
      </div>
    );
  }
}

render(<User />, document.getElementById('root'));
