import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SwipeCards from '../components/SwipeCards.js'

export default class Feed extends Component {
  // static navigationOptions = {
  //   header: {visible: false},
  // }
  constructor(props) {
    super(props)
    console.log('Feed screen state: ')
    console.log(this.props)
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <Text>Feed screen!</Text>
        {//<Text>Welcome {this.props.navigation.state.params.user.displayName}!</Text>
        }
        <SwipeCards style = {{flex: 1}} navProps = {this.props.navigation}/>
      </View>
    )
  }
}



// Card data contains:
// name of dog
// pictures of dog
// Templated bio: breed, age, hobbies
// picture of you
//
//
//
