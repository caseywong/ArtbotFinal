import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../Themes'


const SCREEN_WIDTH = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerTitle: 'ArtBot',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.logo}
            source={Images.logo}
            resizeMode='contain'/>
        </View>
        <View style={styles.userMessage}>
              <Text style={styles.welcomeMessage}> Welcome to ArtBot! </Text>
              <Text style={styles.continueMessage}>your antagonistic, artful companion </Text>
        </View>
        <View style={styles.control}>
          <TouchableOpacity style={styles.controlButtonWrapper}
            onPress={()=> navigation.navigate('SessionSettingsScreen')}>
            <Text style={styles.proceedMessage}> Start a New Canvas </Text>
          </TouchableOpacity>
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
    backgroundColor: 'deepskyblue'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 1 * SCREEN_WIDTH,
  },
  userMessage: {
    flex: 0.15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeMessage: {
    backgroundColor: 'deepskyblue',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  continueMessage: {
    marginTop: 5,
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white'
  },
  proceedMessage: {
    marginTop: 5,
    fontSize: 30,
    color: 'white'
  },
  control: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  controlButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.75 * SCREEN_WIDTH,
    height: 75,
    borderColor: Colors.snow,
    borderRadius: 25,
    borderWidth: 5,
  },
});
