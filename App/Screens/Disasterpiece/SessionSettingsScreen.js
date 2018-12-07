import React from 'react';
import { SafeView, StyleSheet, CameraRoll, Text, View, Image,
  Button, ScrollView, TouchableOpacity, Alert, Dimensions, Slider,
  AsyncStorage} from 'react-native';

import { FontAwesome } from 'react-native-vector-icons';
import { Images, Colors, Metrics } from '../../Themes'
import { Dropdown } from 'react-native-material-dropdown'

import ImagePicker from 'react-native-image-picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SessionSettingsScreeen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerTitle: 'Settings',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  state = {
    sessionTime: '30 sec',
    prompt: "Yes",
    background: "No",
    temperament: 10,
    photos: [],
  }

  _storeData = async (time) => {
    try {
      await AsyncStorage.setItem('time', time);
    } catch (error) {
      // Error saving data
    }
    console.log("Success", time)
  }

  nextScreen(prompt,sessionTime,temperament){
    if (this.state.background === 'No'){
      this.props.navigation.navigate('BlankCanvasScreen', {prompt, sessionTime, temperament});
    } else {
      this.props.navigation.navigate('UploadArtworkScreen', {prompt, sessionTime, temperament});
    }
  }


  render() {
    const { navigation } = this.props;
    const dataTime = [{
      value: "30 sec",
    }, {
      value: "1 min",
    }, {
      value: "2 min",
    }, {
      value: '3 min',
    }, {
      value: "4 min",
    }, {
      value: '5 min',
    }];

    const { prompt, sessionTime, temperament, background} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.userMessage}>
              <Text style={styles.continueMessage}> Choose your settings for this session! </Text>
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.settings}
              source={Images.settings}
              resizeMode='contain'/>
        </View>
        <View style={styles.control}>
            <Text style={styles.promptMessage}> How long is this session? </Text>
            <Dropdown
              data={dataTime}
              value={sessionTime}
              textColor="deepskyblue"
              containerStyle={{width:150, marginBottom: 20}}
              onChangeText={(value) => this.setState({sessionTime: value})}

            />
            <Text style={styles.promptMessage}> Would you like a prompt? </Text>
            <Dropdown
              data={[{value: "Yes"}, {value: "No"}]}
              value={prompt}
              itemTextStyle={{color:'black'}}
              textColor="deepskyblue"
              containerStyle={{width:150, marginBottom: 20}}
              onChangeText={(value) => this.setState({prompt: value})}
            />
            <Text style={styles.promptMessage}> Would you like a canvas background? </Text>
            <Dropdown
              data={[{value: "No"}, {value: "Yes"}]}
              value={background}
              itemTextStyle={{color:'black'}}
              textColor="deepskyblue"
              containerStyle={{width:150, marginBottom: 20}}
              onChangeText={(value) => this.setState({background: value})}
            />
            <Text style={styles.promptMessage}> How nice should Artbot be? </Text>
              <Slider
                 style={{ width: 200, padding: 40}}
                 step={10}
                 value={10}
                 minimumValue={10}
                 maximumValue={100}
                 onValueChange={(value) => this.setState({temperament: value })}
                 minimumTrackTintColor='deepskyblue'
              />
              <Text style={{color: 'deepskyblue',fontSize: 16, fontWeight: 'bold'}}> {this.state.temperament + '%'} </Text>
        </View>
        <View style={styles.start}>
          <TouchableOpacity style={styles.proceedButtonWrapper}
              onPress={()=> this.nextScreen(prompt,sessionTime,temperament)}>
              <Text style={styles.continueMessage}> Start! </Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  settings: {
    width: 0.65 * SCREEN_WIDTH,
    height: 0.5 * SCREEN_WIDTH
  },
  userMessage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeMessage: {
    backgroundColor: 'deepskyblue',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold'
  },
  continueMessage: {
    marginTop: 5,
    fontSize: 20,
    fontStyle: 'italic'
  },
  promptMessage: {
    marginTop: 5,
    fontSize: 20,
  },
  slider: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  control: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  start: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  proceedButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.65 * SCREEN_WIDTH,
    height: 50,
    backgroundColor: 'deepskyblue',
    borderRadius: 25
  },
});
