import { observable, action } from 'mobx';

class Store {
  @observable init = false;
  @observable name = 'aaa';

  @action
  setName = () => {
    this.name = 'bbb';
  };

  @action
  finishInit = () => {
    this.init = true;
  };
}

export default Store;