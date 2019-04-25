import React from 'react';
import firebase from 'firebase';
import { SafeAreaView, StyleSheet, Text, AsyncStorage, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Footer, Button } from 'native-base';
import { TextButton } from './buttons/TextButton';
import { WHITECOLOR, CIRCLEOFFSETCOLOR } from '../utils/Colors';
import { error, SCREEN_HEIGHT } from '../utils/index';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  labelContainer: {
    padding: '2%'
  },
  buttonStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITECOLOR
  },
  imageStyle: {
    width: SCREEN_HEIGHT,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10
  }
});
const navigationAction = (route, navigation) => {
  const navigateAction = NavigationActions.navigate({
    routeName: route
  });
  navigation.dispatch(navigateAction);
};

const onLogout = navigation => {
  firebase
    .auth()
    .signOut()
    .then(async () => {
      AsyncStorage.getAllKeys(async (err, keys) => {
        await AsyncStorage.multiRemove(keys, e => {
          navigationAction('AuthLoading', navigation);
        });
      });
    })
    .catch(e => {
      error(e);
    });
};

const CustomDrawer = ({
  descriptors,
  activeItemKey,
  activeBackgroundColor,
  activeTintColor,
  navigation
}) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: CIRCLEOFFSETCOLOR }}>
    <Container>
      <Content style={{ flex: 1, backgroundColor: CIRCLEOFFSETCOLOR, paddingTop: '15%' }}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        {Object.entries(descriptors).map(x => {
          if (x[0] === 'Food') return;
          return (
            <TextButton
              key={x[0]}
              label={x[1].options.drawerLabel}
              iconName={x[1].options.iconName}
              labelStyle={[
                styles.labelStyle,
                { color: activeItemKey === x[0] ? activeTintColor : 'black' }
              ]}
              style={[
                styles.labelContainer,
                {
                  backgroundColor: activeItemKey === x[0] ? activeBackgroundColor : 'transparent'
                }
              ]}
              onPress={() => navigationAction(x[0], navigation)}
            />
          );
        })}
      </Content>
      <Footer style={{ backgroundColor: CIRCLEOFFSETCOLOR }}>
        <Button full block danger style={{ width: '100%' }} onPress={() => onLogout(navigation)}>
          <Text style={styles.buttonStyle}>Logout</Text>
        </Button>
      </Footer>
    </Container>
  </SafeAreaView>
);
export { CustomDrawer };
