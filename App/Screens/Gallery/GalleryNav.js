import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Images, Colors, Metrics } from '../../Themes'

import ViewDisasterpieceScreen from '../Gallery/ViewDisasterpieceScreen.js'
import ChatbotScreen from '../Gallery/ChatbotScreen.js'
import GalleryScreen from '../../Screens/GalleryScreen.js'
import { FontAwesome } from 'react-native-vector-icons';

const StackNav = createStackNavigator({
  GalleryScreen: {screen: GalleryScreen},
  ChatbotScreen: { screen: ChatbotScreen},
  ViewDisasterpieceScreen: {screen: ViewDisasterpieceScreen},
}, {
  initialRouteName: 'GalleryScreen',
});

const StackContainer = createAppContainer(StackNav);

export default class GalleryNav extends React.Component {

  render() {
      return (
        <View style={styles.container}>
          <StackContainer />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
