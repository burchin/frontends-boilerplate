import React from 'react';
import intl from 'react-intl-universal';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Button } from 'antd-mobile';
import Store from './store';

import Style from './style.scss';

const locales = {
  'zh-CN': require('~/.config/i18n/zh-CN.ts').default,
  'en-US': require('~/.config/i18n/en-US.ts').default
};

@observer
class User extends React.Component {
  store = new Store();

  componentDidMount() {
    this.loadLocales();
  }

  // 载入国际化配置
  loadLocales = () => {
    let currentLocale = 'zh-CN';
    intl
      .init({
        currentLocale: currentLocale,
        locales
      })
      .then(() => {
        this.store.finishInit();
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      this.store.init && (
        <div className={Style.font}>
          {this.store.name}
          <Button type="primary" onClick={this.store.setName.bind(this)}>
            {intl.get('login.login')}
          </Button>
        </div>
      )
    );
  }
}

render(<User />, document.getElementById('root'));
