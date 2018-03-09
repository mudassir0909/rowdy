import * as React from 'react';
import * as styles from './rowdy.css';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

const Rowdy = (props: { url: string }) => (
  <div className={styles.rowdy}>
    <div className={styles.rowdy__faceWrapper}>
      <img src={props.url} />
    </div>
    <div className={styles.rowdy__bodyWrapper}>
      <img className={styles.rowdy__leftHand} src="http://localhost:8001/assets/hand-right.gif"/>
      <div className={styles.rowdy__shirt}>👕</div>
      <img className={styles.rowdy__rightHand} src="http://localhost:8001/assets/hand-right.gif"/>
    </div>
    <div className={styles.rowdy__jeans}>👖</div>
  </div>
);

const enum Emotion {
  NEUTRAL = 1,
  HAPPY,
  SAD,
  ANGRY,
}

class Store {
  @mobx.observable.ref emotion: Emotion = Emotion.NEUTRAL;

  @mobx.computed
  get url() {
    switch (this.emotion) {
      case Emotion.NEUTRAL:
        return 'http://localhost:8001/assets/IMG_1915.GIF';
      case Emotion.ANGRY:
        return 'http://localhost:8001/assets/IMG_1916.GIF';
      case Emotion.SAD:
        return 'http://localhost:8001/assets/IMG_1918.GIF';
      case Emotion.HAPPY:
        return 'http://localhost:8001/assets/IMG_1919.GIF';
      default:
        throw new Error('Rowdy does not support this emotion yet!');
    }
  }
}

class Presenter {
  @mobx.action
  happy(store: Store) {
    store.emotion = Emotion.HAPPY;
  }

  @mobx.action
  sad(store: Store) {
    store.emotion = Emotion.SAD;
  }

  @mobx.action
  neutral(store: Store) {
    store.emotion = Emotion.NEUTRAL;
  }

  @mobx.action
  angry(store: Store) {
    store.emotion = Emotion.ANGRY;
  }
}

export function createRowdy() {
  const store = new Store();
  const presenter = new Presenter();
  // const url = store.url;

  return {
    // Rowdy: mobxReact.observer(() => <Rowdy url={url} />),
    Rowdy: mobxReact.observer(() => <Rowdy url={store.url} />),
    store,
    presenter,
  }
}
