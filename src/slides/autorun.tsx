mobx.autorun(() => {
  if (projectorStore.item === 'beer') {
    presenter.happy(store);
  } else if (projectorStore.item === 'spider') {
    presenter.angry(store);
  } else {
    presenter.neutral(store);
  }
});

mobx.when(() => projectorStore.item === 'beer', () => presenter.happy(store));
