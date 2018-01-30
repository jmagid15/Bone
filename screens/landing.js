import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  SocialIcon,
} from 'react-native-elements';
import SwipeCards from '../components/SwipeCards.js';
import { Facebook } from 'expo';
import firebase from 'firebase';
import {FACEBOOK_APP_ID, config} from '../config/credentials.js'

const window = Dimensions.get('window');


firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();



export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logInStatus: 'signed out',
      errorMessage: 'none'
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged (user => {
      if (user != null) {
        this.setState({logInStatus: 'We are authenticated now!'});
        console.log('Printing user object');
        console.log({user});
        this.props.navigation.navigate('Tabs', {user});
      } else {
        this.setState({logInStatus: 'You are currently logged out.'});
      }
    });
  }

  async handleFacebookButton() {
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email', 'user_friends']
    });
    if (type === 'success') {
      // Firebase credential is created with the Facebook access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      auth.signInWithCredential(credential).catch(error => {
        this.setState({errorMessage: error.message});
      });
      // TODO: NEED TO PASS USER OBJECT
      this.props.navigation.navigate('Tabs');
    } else {
      console.log('[landing.js] Login unsuccesful.')
    }
  }


  render() {
    return (
      <View style = {styles.container}>
        <ImageBackground
          source = {require('../images/landingPage.jpg')}
          style = {styles.landingPageImage}
        >
        </ImageBackground>
        <View style = {styles.logoContainer}>
          <Text style = {styles.boneLogo}>BONE.</Text>
        </View>
        <View style = {{height: window.height / 4, backgroundColor: 'white'}}/>
        <View style = {styles.loginContainer}>
          <SocialIcon
            onPress = {() =>
              this.handleFacebookButton()
            }
            title = "Sign in with Facebook"
            button
            raised
            type = 'facebook'
          />
        </View>
        <Text>Logged In Status: {this.state.logInStatus}</Text>
        <Text>Log In Error Messages: {this.state.errorMessage}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: window.height / 6,
    backgroundColor: 'transparent',
  },
  boneLogo: {
    fontSize: 40,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  landingPageImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5
  },
  loginContainer: {
    flex: 1,
    width: '70%',
    backgroundColor: 'transparent'
  },
});
