import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { FontAwesome } from 'react-native-vector-icons';
import { Images, Colors, Metrics } from '../../Themes'
import ImagePicker from "react-native-image-picker";

const SCREEN_WIDTH = Dimensions.get('window').width;

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
      <Text style={styles.textStyle}>Choose canvas background</Text>
      <View style={styles.placeholder}>
        <Image source={this.state.pickedImage} style={styles.previewImage} />
      </View>
        <View style={styles.button}>

          <Button title="Pick Image" onPress={this.pickImageHandler} />

          <Button title="Reset" onPress={this.resetHandler} />

        </View>
        <TouchableOpacity style={styles.proceedButtonWrapper}
            onPress={()=> this.nextScreen()}>
            <Text style={styles.continueMessage}> Start! </Text>
        </TouchableOpacity>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    alignItems:"center"
  },
  textStyle: {
    fontWeight:"bold",
    fontSize:30,
    textAlign:"center",
    color:"red",
    marginTop:10
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "70%",
    height: 280,
    marginTop:50,
  },
  button: {
    width: "80%",
    marginTop:20,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  previewImage: {
      width: "100%",
      height: "100%"
  }
  });
