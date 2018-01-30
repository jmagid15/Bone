import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Settings extends Component {

  constructor(props) {
    super(props)
    console.log('Settings Props')
    console.log(this.props)
  }

  imagePressed() {
    console.log('Image Pressed');
    console.log(this.props);
  }

  render() {
    return (
      <View>
        <Text>Settings screen!</Text>
        <TouchableOpacity onPress = {this.imagePressed.bind(this)}>
          <Image style={{width:300, height:300,}} source={{uri: this.props.navigation.state.params.userProps.photoURL}} />
        </TouchableOpacity>
      </View>
    )
  }
}
