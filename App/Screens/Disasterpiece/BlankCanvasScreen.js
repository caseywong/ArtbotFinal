import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import TimerCountdown from 'react-native-timer-countdown';

const promptOptions = [
  'a tree', 'a dog', 'Trijeet', 'a dinosaur', 'a unicorn', 'an alien',
  'a snowperson', 'an island', 'an airplane', 'a clown', 'your nightmare'
];

export default class BlankCanvasScreen extends React.Component {
  constructor(props) {
    super(props);
    const prompt = promptOptions[Math.floor(Math.random() * promptOptions.length)];
    this.state = {
      hasStarted: false,
      sessionTime: null,
      prompt,
      path: [{
        drawer: 'user1',
        size: { // the size of drawer's canvas
          width: SCREEN_WIDTH*2,
          height: 640
        },
        path: {
          id: 0, // path id
          color: '#000000', // ARGB or RGB
          width: 10,
          data: [
            "0 ,100",  // x,y
            SCREEN_WIDTH +",100",
            SCREEN_WIDTH*3 +",100"
          ]
        }
        },
        {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: SCREEN_WIDTH*2,
            height: SCREEN_HEIGHT*2
          },
          path: {
            id: 1, // path id
            color: '#FF5733', // ARGB or RGB
            width: 10,
            data: [
              "0 ,0",  // x,y
              SCREEN_WIDTH*4 +"," + SCREEN_HEIGHT*4,
            ]
          }
        },
        {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: SCREEN_WIDTH*2,
            height: 640
          },
          path: {
            id: 2, // path id
            color: '#1AE76B', // ARGB or RGB
            width: 10,
            data: [
              SCREEN_WIDTH + ",0",  // x,y
              SCREEN_WIDTH + "," + SCREEN_HEIGHT*4,
            ]
          }
        },
        {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: SCREEN_WIDTH*2,
            height: 640
          },
          path: {
            id: 3, // path id
            color: '#33C7FF', // ARGB or RGB
            width: 10,
            data: [
              "0,"+ SCREEN_WIDTH ,  // x,y
              SCREEN_HEIGHT*4 + "," + SCREEN_WIDTH
            ]
          }
        },
        {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: SCREEN_WIDTH*2,
            height: 640
          },
          path: {
            id: 4, // path id
            color: '#261AE7', // ARGB or RGB
            width: 10,
            data: [
              "0,"+ SCREEN_WIDTH*1.3 ,  // x,y
              SCREEN_HEIGHT*4 + "," + SCREEN_WIDTH*1.3
            ]
          }
        },
        {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: SCREEN_WIDTH*2,
            height: 640
          },
          path: {
            id: 5, // path id
            color: '#E71ACE', // ARGB or RGB
            width: 10,
            data: [
              SCREEN_WIDTH*2 +",0",  // x,y
              "0 ," + SCREEN_HEIGHT*2
            ]
          }
        },
      ],
      userPaths: []
    }
  }

  static navigationOptions = {
    headerTitle: 'Disasterpiece',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  addLine(time){
    time = Math.floor(time / 1000);
    if (this.state.hasStarted && time % this.state.temperament === 0 && time < this.state.sessionTime*60 && time > 10){
      var num = Math.floor(Math.random() * 7);
      if (num <= 5) {
        this.canvas1.addPath(this.state.path[num])
        this.state.userPaths.push(this.state.path[num]);
      } else {
        this.canvas1.clear();
        for (j = 0; j < this.state.userPaths.length; j++){
          alt_path = this.state.userPaths[j];
          for (i = 0; i < alt_path.path.data.length; i++){
            var coords = alt_path.path.data[i].split(",");
            tmp = coords[0];
            coords[0] = coords[1];
            coords[1] = tmp;
            alt_path.path.data[i] = coords.join(",");
          }
          this.canvas1.addPath(alt_path)
        }
      }
    }
  }

  onFinish(){
    if (this.state.hasStarted) {
      this.setState({"hasStarted": false});
      this.setState({"sessionTime": 0});
      Alert.alert(
        "Time's Up!", "Want to chat with ArtBot?",
        [{text: "Maybe Later", onPress: () => this.props.navigation.navigate('HomeScreen')},
        {text: "Yes!", onPress: () => this.props.navigation.navigate('ChatbotScreen')},]
      );
    }
  }

  startTime(time){
    this.setState({hasStarted: true});
    this.setState({"sessionTime": time})
  }
  
  async componentDidMount() {
    // var value = await AsyncStorage.getItem('time');
    this.setState({"sessionTime": 0});
    this.setState({"temperament": this.props.navigation.getParam("temperament")});
    var time = this.props.navigation.getParam('sessionTime', '3 min');
    time = time.split(" ")[0];
    if (this.props.navigation.getParam("prompt", "No") == "Yes") {
      Alert.alert(
        "Draw " + this.state.prompt + "!", null,
        [{text: 'OK', onPress: () => this.startTime(time)}]
      );
    } else {
      this.setState({"sessionTime": time});
    }
  }

  render() {

    const { navigation } = this.props
    let promptText = null;
    if (navigation.getParam('prompt', 'No') == 'Yes') {
      promptText = <View style={{position: 'absolute', width: '100%'}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          {this.state.prompt}
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                <RNSketchCanvas
                  ref={ref => this.canvas1 = ref}
                  containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                  canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                  defaultStrokeIndex={0}
                  defaultStrokeWidth={5}

                  strokeComponent={color => (
                    <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                  )}
                  strokeSelectedComponent={(color, index, changed) => {
                    return (
                      <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                    )
                  }}
                  strokeWidthComponent={(w) => {
                    return (<View style={styles.strokeWidthButton}>
                      <View  style={{
                        backgroundColor: 'white', marginHorizontal: 2.5,
                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                      }} />
                    </View>
                  )}}

                  onStrokeEnd={(path) => {
                    this.state.userPaths.push(path);
                  }}
                />

                <View style= {{position: 'absolute', top:0, left: 10 }}>

                <TimerCountdown
                      initialSecondsRemaining={this.state.sessionTime * 60000}
                      onTick={secondsRemaining => this.addLine.apply(this,[secondsRemaining])}
                      onTimeElapsed={() => this.onFinish()}
                      //TODO: Style timer
                      allowFontScaling={true}
                      style={{ fontSize: 25 }}
                  />
                </View>
                {promptText}
              </View>
            </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center'
  },
  blankCanvasTitle: {
    fontSize: 35,
    textDecorationLine: 'underline',
    backgroundColor: 'deepskyblue'
  },
  blankCanvasContainer: {
    flex: 1,
    width: 0.9 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});
