'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  _cardPressed() {
    const detailsProps = this.props;
    this.props.navProps.navigate('Details', {detailsProps});
  }

  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress = {this._cardPressed.bind(this)}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        </TouchableOpacity>
        <Text style={styles.text}>This is {this.props.name}</Text>
        <Text style={styles.text}>Breed: {this.props.breed}</Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}

const cards = [
  {
    name: 'Waffles',
    breed: 'Pug',
    bio: 'Waffles is such a cutie. She loves to cuddle and play and bark at the mail man. Main hobbies include eating and sleeping.',
    image: 'http://cdn.akc.org/content/hero/pug-breed-header.jpg',
  },
  {
    name: 'Rover',
    breed: 'Golden Retriever',
    bio: 'Rover is a good boy. He can get the mail directly from the porch. If you call Rover and whistle, he 6 times out of 10 comes.',
    image: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/golden-retriever-dogs-and-puppies/golden-retriever-dogs-puppies-10.jpg'
  },
  {
    name: 'Pearl',
    breed: 'Scottish Terrier',
    bio: 'Pearl tries really hard. She sometimes loses her tennis ball and that makes her sad.',
    image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'
  },
  {
    name: 'Barky',
    breed: 'Labradoodle',
    image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'
  },
  {
    name: 'Captain',
    breed: 'German Shepard',
    image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'
  },
  {
    name: 'Boots',
    breed: 'Corgi' ,
    image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'
  },
  {
    name: '7',
    image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'
  },
  {
    name: '8',
    image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'
  },
  {
    name: '9',
    image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'
  },
]

const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: cards,
      outOfCards: false
    }
  }

  handleYup (card) {
    console.log("yup")
  }

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} navProps = {this.props.navProps} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}

        onClickHandler = {() => console.log('tap')}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
