import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../Themes'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class GalleryScreen extends React.Component {

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.galleryTitle}> Your Gallery </Text>
          </View>
          <View style={styles.galleryContainer}>
            <Text> npm install react-native-photo-grid --save </Text>
            <Text> https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0 </Text>
          </View>
      </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  titleContainer: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center'
  },
  galleryTitle: {
    fontSize: 35,
    textDecorationLine: 'underline',
    backgroundColor: 'deepskyblue'
  },
  galleryContainer: {
    flex: 1,
    width: 0.9 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
});
