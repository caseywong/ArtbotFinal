import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage, ListView } from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ViewDisasterpieceScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerTitle: 'Disasterpiece',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  state = {
    creativeIQ: false,
  };

  render() {
    const { navigation } = this.props;
    //Eventually pass this through props and add to this list

    if ( this.state.creativeIQ ) {
      return (
        <View style={styles.container}>
              <Text style={styles.imageTitle}> Muscle Tree</Text>
              <Text style={styles.dateTitle}> November 30, 2018 </Text>
              <Image style={styles.disasterpieceView}
                    resizeMode="contain"
                    source={Images.muscleTree}/>
              <Text style={styles.imageTitle}> CreativeIQ: 8.5 </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
              <Text style={styles.imageTitle}> Muscle Tree</Text>
              <Text style={styles.dateTitle}> November 30, 2018 </Text>
              <Image style={styles.disasterpieceView}
                    resizeMode="contain"
                    source={Images.muscleTree}/>
              <TouchableOpacity style={styles.proceedButtonWrapper}
                  onPress={() => navigation.navigate('ChatbotScreen',{fromCanvas: false})}>
                  <Text style={{fontSize: 18}}>Calculate Creative IQ!</Text>
              </TouchableOpacity>
        </View>
      );
    }
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  disasterpieceView: {
    width: 0.6 * SCREEN_WIDTH,
    height: 0.6 * SCREEN_HEIGHT,
    borderColor: 'black',
    borderWidth: 2,
  },
  imageTitle: {
      fontSize: 24,
      marginTop: 10,
      fontWeight: 'bold',
      backgroundColor: 'deepskyblue'
  },
  dateTitle: {
      fontSize: 18,
  },
  proceedButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.50 * SCREEN_WIDTH,
    height: 30,
    backgroundColor: 'deepskyblue',
    borderRadius: 25,
    marginBottom: 5,
  }
});
