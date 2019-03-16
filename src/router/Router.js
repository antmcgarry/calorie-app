/* eslint-disable import/no-unresolved */
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../components/Main';

const rootStack = createStackNavigator({
  Main: { screen: Main }
});

const AppStack = createAppContainer(rootStack);
export default AppStack;
