/* eslint-disable import/no-unresolved */
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../components/Main';
import { PRIMARYCOLOR } from '../utils/Colors';

const rootStack = createStackNavigator(
  {
    Main: { screen: Main }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: PRIMARYCOLOR
      }
    }
  }
);

const AppStack = createAppContainer(rootStack);
export default AppStack;
