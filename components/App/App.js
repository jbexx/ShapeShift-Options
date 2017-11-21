import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Rate from '../Rate/Rate';
import AvailableCoins from '../AvailableCoins/AvailableCoins';

export default class App extends Component {
  render() {
    return (
      <View>
        <AvailableCoins />
      </View>
    );
  }
}
