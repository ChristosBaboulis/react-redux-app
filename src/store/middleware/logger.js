const logger = (param) => (store) => (next) => (action) => {
  // console.log('Logging', param);
  // console.log('store: ', store);
  // console.log('next: ', next);
  // console.log('action: ', action);
  return next(action);
};

export default logger;
