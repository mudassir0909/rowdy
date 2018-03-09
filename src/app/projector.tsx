import * as React from 'react';
import * as styles from './projector.css';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

const ProjectorImpl = (props: { item: string | undefined, showBeer: () => void, showSpider: () => void }) => (
  <div>
    <div className={styles.projector}>{props.item}</div>
    <div>
      <button onClick={props.showBeer}>Show Beer</button>
      <button onClick={props.showSpider}>Show Spider</button>
    </div>
  </div>
);

type Item = 'beer' | 'spider';

class Store {
  @mobx.observable.ref item?: Item;

  @mobx.computed
  get displayItem() {
    if (this.item) {
      return this.item === 'beer' ? '🍺' : '🕷';
    }
  }
}

class Presenter {
  @mobx.action
  show(store: Store, item: Item) {
    store.item = item;
  }
}

export const createProjector = () => {
  const store = new Store();
  const presenter = new Presenter();
  const showBeer = () => presenter.show(store, 'beer');
  const showSpider = () => presenter.show(store, 'spider');

  const Projector = mobxReact.observer(() => <ProjectorImpl {...{
    item: store.displayItem,
    showBeer,
    showSpider,
  }} />);

  return { Projector, projectorStore: store };
};
