import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ChatbotScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Chatbot',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
          <View style={styles.chatbotContainer}>
            <Text> find chatbot package </Text>
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
  chatbotTitle: {
    fontSize: 35,
    textDecorationLine: 'underline',
    backgroundColor: 'deepskyblue'
  },
  chatbotContainer: {
    flex: 1,
    width: 0.9 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
});
