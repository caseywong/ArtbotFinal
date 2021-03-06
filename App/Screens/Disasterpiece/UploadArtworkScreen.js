import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { FontAwesome } from 'react-native-vector-icons';
import { Images, Colors, Metrics } from '../../Themes'
import ImagePicker from "react-native-image-picker";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

export default class UploadArtworkScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Upload Artwork',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  }

  /**
  * The first arg is the options object for customization (it can also be null or omitted for default options),
  * The second arg is the callback which sends object: response (more info below in README)
  */

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });

      }
    });
  }

  resetHandler = () =>{
    this.reset();
  }

  nextScreen(){
    var prompt = this.props.navigation.getParam('prompt', 'No');
    var sessionTime = this.props.navigation.getParam('sessionTime', '3 min');
    var temperament = this.props.navigation.getParam('temperament', 50);
    var background = this.state.pickedImage['uri'];
    background = background.replace('file://', '')
    console.log("IMG",background);
    this.props.navigation.navigate('BlankCanvasScreen', {prompt, sessionTime, temperament, background});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Choose Your Canvas</Text>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.pickImageHandler}>
              <Text style={{fontSize:22}}> Upload </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.resetHandler}>
              <Text style={{fontSize:22}}> Reset </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.continuebuttonStyle}
            onPress={()=> this.nextScreen()}>
            <Text style={styles.continueMessage}> Start! </Text>
        </TouchableOpacity>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems:"center"
  },
  textStyle: {
    fontWeight:'bold',
    fontSize:30,
    marginTop:20
  },
  placeholder: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#eee",
    width: 0.75 * SCREEN_WIDTH,
    height: 0.5 * SCREEN_HEIGHT,
    marginTop:25,
  },
  buttonContainer: {
    flex: 0.5,
    width: 0.75 * SCREEN_WIDTH,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: "space-around",
  },
  buttonStyle: {
    backgroundColor: 'deepskyblue',
    height: 40,
    width: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImage: {
      width: "100%",
      height: "100%"
  },
  continuebuttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 0.65 * SCREEN_WIDTH,
      height: 50,
      backgroundColor: 'deepskyblue',
      borderRadius: 25,
  },
  continueMessage: {
    fontSize: 26,
  }
});
