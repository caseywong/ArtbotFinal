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

    const name = this.props.navigation.getParam('imageName', 'Untitled');
    const date = this.props.navigation.getParam('imageDate', 'N/A');
    const imageIQ = this.props.navigation.getParam('imageIQ', 0);
    const image = this.props.navigation.getParam('imageSrc', Images.anon);

    if ( imageIQ != 0 ) {
      return (
        <View style={styles.container}>
              <Text style={styles.imageTitle}> {name} </Text>
              <Text style={styles.dateTitle}> {date} </Text>
              <Image style={styles.disasterpieceView}
                    resizeMode="contain"
                    source={image}/>
              <Text style={styles.iqTitle}> CreativeIQ: {imageIQ} </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
              <Text style={styles.imageTitle}> {name} </Text>
              <Text style={styles.dateTitle}> {date} </Text>
              <Image style={styles.disasterpieceView}
                    resizeMode="contain"
                    source={image}/>
              <TouchableOpacity style={styles.proceedButtonWrapper}
                  onPress={() => navigation.navigate('ChatbotScreen',{fromCanvas: false})}>
                  <Text style={{fontSize: 22}}>Calculate Creative IQ!</Text>
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
    width: 0.75 * SCREEN_WIDTH,
    height: 0.6 * SCREEN_HEIGHT,
    borderColor: 'black',
    borderWidth: 2,
  },
  imageTitle: {
      fontSize: 40,
      marginTop: 10,
      fontWeight: 'bold',
      backgroundColor: 'deepskyblue'
  },
  dateTitle: {
      fontSize: 24,
  },
  iqTitle: {
      fontSize: 24,
      backgroundColor: 'deepskyblue',
      marginBottom: 5,
  },
  proceedButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.65 * SCREEN_WIDTH,
    height: 40,
    backgroundColor: 'deepskyblue',
    borderRadius: 25,
    marginBottom: 5,
  }
});
