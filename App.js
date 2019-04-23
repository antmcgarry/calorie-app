import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/router/Reducers';
import AppStack from './src/router/Router';

const config = {
  apiKey: 'AIzaSyAOSfGHvLkO5HNQBDQMNDwN-hNqqvDkBR8',
  authDomain: 'calorie-tracking-4ee4c.firebaseapp.com',
  databaseURL: 'https://calorie-tracking-4ee4c.firebaseio.com',
  projectId: 'calorie-tracking-4ee4c',
  storageBucket: 'calorie-tracking-4ee4c.appspot.com',
  messagingSenderId: '714785466548'
};

const app = () => {
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  firebase.initializeApp(config);
  return (
    <Root>
      <Provider store={store}>
        <AppStack />
      </Provider>
    </Root>
  );
};
export default app;
