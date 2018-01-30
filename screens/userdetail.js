import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class UserDetail extends Component {

  constructor(props) {
    super(props)
    console.log('hi')
    console.log(this.props)
    console.log('--------')
    console.log(this.props.navigation.state.params)
  }

  render() {

    return (
      <View>
        <Text>UserDetail screen!</Text>
        <Image style= {{width: 300, height: 300}} source={{uri: this.props.navigation.state.params.detailsProps.image}}/>
        <Text>Name: {this.props.navigation.state.params.detailsProps.name}</Text>
        <Text>Breed: {this.props.navigation.state.params.detailsProps.breed}</Text>
        <Text>Bio: {this.props.navigation.state.params.detailsProps.bio}</Text>
      </View>
    )
  }
}
