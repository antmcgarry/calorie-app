import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { Container, Content, Spinner } from 'native-base';
import * as Progress from 'react-native-progress';
import { View, Alert, Text, StyleSheet } from 'react-native';
import { HeaderBar, RewardsIcon } from '../../commonComponents';
import { SCREEN_WIDTH } from '../../utils/index';

const REWARDSURL = 'https://api.myjson.com/bins/q5k9w';

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

class Rewards extends Component {
  state = {
    fontLoaded: false,
    loading: true,
    rewards: [],
    points: 0,
    level: 1,
    nextLevelPoints: 50
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontName: require('../../../assets/fonts/icomoon.ttf')
    });
    const data = await axios.get(REWARDSURL);
    let tempPoints = 0;
    data.data.forEach(item => {
      if (item.Complete) {
        tempPoints = tempPoints + item.Points;
      }
    });
    if (tempPoints > 0) {
      if (tempPoints > 50) {
        this.setState({ level: 2 });
        this.setState({ nextLevelPoints: 100 });
      }
      if (tempPoints > 100) {
        this.setState({ level: 3 });
        this.setState({ nextLevelPoints: 150 });
      }
      if (tempPoints > 150) {
        this.setState({ level: 4 });
        this.setState({ nextLevelPoints: 200 });
      }
    }
    this.setState({ fontLoaded: true });
    this.setState({ rewards: data.data, loading: false, points: tempPoints });
  }

  renderAlert = reward =>
    Alert.alert(
      'Reward',
      `Objective: ${reward.Task} \n\n Points: ${reward.Points} \n\n ${
        reward.Complete ? `Completed: ${reward.Date}` : 'You can do it!'
      }`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      {
        cancelable: false
      }
    );

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const { loading, fontLoaded, rewards, level, points, nextLevelPoints } = this.state;
    return (
      <Container>
        <HeaderBar onLeftPress={() => goBack()} onRightPress={() => navigate('Rewards')} />
        <Content style={{ marginHorizontal: '2%' }}>
          {fontLoaded && !loading ? (
            <>
              <View style={{ margin: 10 }}>
                <Text style={styles.titleStyle}>Level: {level}</Text>
                <Progress.Bar progress={0.7} width={SCREEN_WIDTH * 0.9} />
                <Text style={{ alignSelf: 'flex-end' }}>
                  {points}/{nextLevelPoints}
                </Text>
              </View>
              <Text style={styles.titleStyle}>Badges:</Text>
              <View style={styles.badgeContainer}>
                {rewards.map(reward => (
                  <RewardsIcon
                    key={reward.id}
                    number={reward.id}
                    complete={reward.Complete}
                    onPress={() => this.renderAlert(reward)}
                  />
                ))}
              </View>
            </>
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}

export default connect(
  state => ({
    state: state.User
  }),
  dispatch => ({
    // actions: bindActionCreators(classActions, dispatch)
  })
)(Rewards);
