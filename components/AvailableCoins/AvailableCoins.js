import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      coins: {},
      ready: false
    }
  }

  componentDidMount() {
    fetch('https://shapeshift.io/getcoins')
    .then( data => data.json())
    .then( response => this.setState({
      coins: response,
      ready: true
    }))
  }

  render() {
    
    const { coins, ready } = this.state
    let mappedCoins;

    if ( ready ) {
      console.log('coins ', coins)
      const coinKeys = Object.keys(coins)
      mappedCoins = coinKeys.map( coin => ( <View style={ styles.coin } key={ coins[coin].symbol }>
                                              <Image style={ styles.coinImage } source={ { uri: coins[coin].image } }/>
                                              <Text>{ coins[coin].name }</Text>
                                              <Text>{ coins[coin].symbol }</Text>
                                              <Text>{ coins[coin].status }</Text>
                                            </View> ))
    }
    
    return (
      <View style={ styles.mainView }>
       { mappedCoins }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  coin: {
    alignItems: 'center',
    margin: 5
  },

  coinImage: {
    height: 75,
    width: 75
  }
})
