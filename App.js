import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/router/Reducers';
import AppStack from './src/router/Router';

const app = () => {
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Root>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </Root>
  );
};
export default app;
