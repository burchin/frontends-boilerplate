import { observable, action } from 'mobx';

class Store {
  @observable logining = 'aaa';

  @action
  test = () => {
    this.logining = 'bbb';
  };
}

export default Store;