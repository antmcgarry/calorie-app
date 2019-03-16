const INITIAL_STATE = { test: 'hello' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'Hello':
      return state;
    default:
      return state;
  }
};
