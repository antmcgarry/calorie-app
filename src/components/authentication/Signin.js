/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Text, Image, StatusBar } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import { Button, Spinner, Container, Content } from 'native-base';
import { InputBox } from '../../commonComponents';
import { PRIMARYCOLOR, WHITECOLOR } from '../../utils/Colors';
import { error, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    backgroundColor: PRIMARYCOLOR
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: WHITECOLOR,
    fontSize: 20
  },
  imageStyle: {
    height: SCREEN_HEIGHT * 0.21,
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    marginBottom: '10%'
  }
});

class SigninScreen extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ email, password }) {
    this.setState({ loading: true });
    const { navigation } = this.props;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        AsyncStorage.setItem('account', JSON.stringify(user));
        navigation.navigate('App');
      })
      .catch(e => {
        console.log(e);

        if (e.code === 'auth/user-not-found') {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate('App');
            })
            .catch(er => {
              console.log(er);

              const errorMessage = er.message;
              error(errorMessage);
              this.setState({ loading: false });
            });
        } else {
          const errorMessage = e.message;
          error(errorMessage);
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
          password: Yup.string().required(),
          email: Yup.string()
            .email()
            .required()
        })}
        render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched }) => (
          <Container>
            <StatusBar barStyle="light-content" backgroundColor={PRIMARYCOLOR} />

            <Content scrollEnabled={false} contentContainerStyle={styles.container}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
              <InputBox
                label="Email Address"
                placeholder="Email Address"
                value={values.email}
                errorMessage={errors.email}
                error={errors.email && touched.email}
                onChangeText={value => setFieldValue('email', value)}
                onBlur={() => setFieldTouched('email')}
              />
              <InputBox
                label="Password"
                placeholder="Password"
                value={values.password}
                errorMessage={errors.password}
                error={errors.password && touched.password}
                onChangeText={value => setFieldValue('password', value)}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
              />
              {!loading ? (
                <Button block onPress={() => handleSubmit(values)}>
                  <Text style={styles.buttonTextStyle}>Sign in</Text>
                </Button>
              ) : (
                <Spinner color={WHITECOLOR} />
              )}
            </Content>
          </Container>
        )}
      />
    );
  }
}

export default SigninScreen;
