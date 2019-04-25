import React from 'react';
import { Platform, View, StyleSheet, StatusBar } from 'react-native';
import { PRIMARYCOLOR, WHITECOLOR } from '../utils/Colors';
import { IconButton } from './buttons/IconButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARYCOLOR,
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: '2%'
  },
  iconTextStyle: {
    color: WHITECOLOR
  },
  iconContainer: {
    paddingTop: '12%',
    paddingHorizontal: '5%'
  }
});
const backArrow = Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back';
const HeaderBar = ({ onLeftPress, wantMenu, onRightPress, notBlank = true }) => {
  if (!notBlank) return <View style={styles.container} />;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARYCOLOR} />
      {wantMenu ? (
        <IconButton
          name="menu"
          iconStyle={styles.iconTextStyle}
          style={styles.iconContainer}
          onPress={onLeftPress}
        />
      ) : (
        <IconButton
          name={backArrow}
          iconStyle={styles.iconTextStyle}
          style={styles.iconContainer}
          onPress={onLeftPress}
        />
      )}
      <IconButton
        name="trophy"
        iconStyle={styles.iconTextStyle}
        style={styles.iconContainer}
        onPress={onRightPress}
      />
    </View>
  );
};

export { HeaderBar };
