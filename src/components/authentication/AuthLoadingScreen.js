import React from 'react';
import { AsyncStorage, View, StyleSheet, Image, StatusBar } from 'react-native';
import { Spinner } from 'native-base';
import firebase from 'firebase';
import { WHITECOLOR, PRIMARYCOLOR } from '../../utils/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, resetAction } from '../../utils/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    backgroundColor: PRIMARYCOLOR
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.21,
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    marginBottom: '10%'
  }
});

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation } = this.props;
    const result = await AsyncStorage.getItem('stats');
    firebase.auth().onAuthStateChanged(user => {
      AsyncStorage.setItem('account', JSON.stringify(user));
      if (result) {
        const statsJson = JSON.parse(result);
        if (statsJson.finishedInfo && user) {
          navigation.dispatch(resetAction('Drawer', { account: user, stats: statsJson }));
        } else {
          navigation.navigate('Auth');
        }
      } else if (user) {
        navigation.navigate(user ? 'App' : 'Auth', { account: user });
      } else {
        navigation.navigate('Auth');
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={PRIMARYCOLOR} />

        <Image
          source={require('../../../assets/logo.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <Spinner color={WHITECOLOR} />
      </View>
    );
  }
}

export default AuthLoadingScreen;
