import * as React from 'react';
import * as styles from './app.css';
import { hot } from 'react-hot-loader';
import { createRowdy } from './rowdy';
import { useStrict } from 'mobx';
import * as mobx from 'mobx';
import { createProjector } from './projector';

useStrict(true);
const { Rowdy, presenter, store } = createRowdy();
const { Projector, projectorStore } = createProjector();

mobx.when(() => projectorStore.item === 'beer', () => presenter.happy(store));


// render react DOM
export const App = hot(module)(({ history }) => (
  <div className={styles.root}>
    <div className={styles.rowdyWrapper}>
      <Rowdy />
      <div>
        <button onClick={() => presenter.happy(store)}>Happy</button>
        <button onClick={() => presenter.sad(store)}>Sad</button>
        <button onClick={() => presenter.neutral(store)}>Neutral</button>
        <button onClick={() => presenter.angry(store)}>Angry</button>
      </div>
    </div>

    <div className={styles.projectorWrapper}>
      <Projector />
    </div>
  </div>
));
