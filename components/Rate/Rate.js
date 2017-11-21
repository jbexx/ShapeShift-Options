import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';

import pairs from '../../assets/pairs';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      pair: 'BTC_ETH',
      pairData: {}
    }
    this.getPair = this.getPair.bind(this);
  }

  componentDidMount() {
    this.getPair();
  }

  getPair() {
    fetch(`https://shapeshift.io/rate/${this.state.pair}`)
    .then( data => data.json())
    .then( result => {
      this.setState({
        pairData: result
      })
    })
    .catch( error => console.log({ error }))
  }

  render() {
    const { pairData } = this.state

    const mappedPairs = pairs.map(pair => <Picker.Item key={ pair.pair }
      label={ pair.pair }
      value={ pair.pair } />)
    
    return (
      <View style={ styles.mainView }>
      <View style={ styles.pairData }>
        <Text style={ styles.pairDataText }>{ pairData.pair }</Text>
        <Text style={ styles.pairDataText }>{ pairData.rate }</Text>
      </View>
        <Picker selectedValue={ this.state.pair }
                onValueChange={ itemValue => this.setState({ pair: itemValue }) }
                prompt='Choose a Pair'
                style={ styles.picker }
                itemStyle={ styles.langStyle }>
          { mappedPairs }
        </Picker>
        <TouchableOpacity style={ styles.pairBtn } onPress={ this.getPair }>
          <Text style={ styles.pairText }>Go</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20
  },

  pairData: {
    alignItems: 'center'
  },

  pairDataText: {
    fontSize: 20
  },

  picker: {
    shadowColor: '#000',
    marginTop: Dimensions.get('window').height / 3,
    width: Dimensions.get("window").width
  },

  pairBtn: {
    alignItems: 'center'
  },

  pairText: {
    borderWidth: 2,
    borderColor: '#6dcff6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    fontSize: 30,
    padding: 25
  },
})
