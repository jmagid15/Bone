import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';

import { ImagePicker } from 'expo'

import b64 from 'base64-js'

import { Facebook } from 'expo';
import firebase from 'firebase';

import UploadImg from '../components/UploadImg.js'

async function takeAndUploadPhotoAsync() {
    const result = await ImagePicker.launchCameraAsync({
        base64: true
    })
   const byteArray = b64.toByteArray(result.base64)
   const metadata = {contentType: 'image/jpg'};
   firebase.storage().ref('/images').child('my_pic.jpg').put(byteArray, metadata).then(snapshot => {
       console.log("uploaded image!")
   })
}

export default class Profile extends Component {

  constructor(props) {
    super(props)
    console.log('Profile screen props: ')
    console.log(this.props)
  }

  settingsButtonPressed() {
    const userProps = this.props.navigation.state.params.user;
    console.log('Printing userProps');
    console.log(userProps);
    this.props.navigation.navigate('Settings', {userProps});
  }

  handleSignOut() {
    try {
      firebase.auth().signOut();
      this.props.navigation.navigate('LandingScreen');
    } catch (e) {
      alert(e)
      console.log(e);
    }
  }

  render() {
    return (
      <View style = {{flex:1}}>
        <Text>Profile screen!</Text>
        <Button
          title = 'Sign out'
          onPress = {async () =>
            this.handleSignOut()
          }
        />
        <Button
          title = 'Upload a pic'
          onPress = {() => takeAndUploadPhotoAsync()}
        />
        <UploadImg />
        <Button
          title = 'Settings'
          onPress = {this.settingsButtonPressed.bind(this)}
        />
      </View>
    )
  }
}
