import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'

const SCREEN_WIDTH = Dimensions.get('window').width;

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import TimerCountdown from 'react-native-timer-countdown';

export default class BlankCanvasScreen extends React.Component {
  constructor(props) {
  super(props);
  this.canvas = React.createRef();
}
  static navigationOptions = {
    headerTitle: 'Disasterpiece',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  state = {
    sessionTime: null,
    path: {
      drawer: 'user1',
      size: { // the size of drawer's canvas
        width: 480,
        height: 640
      },
      path: {
        id: 0, // path id
        color: '#000000', // ARGB or RGB
        width: 10,
        data: [
          "296.11,281.34",  // x,y
          "293.52,284.64",
          "290.75,289.73"
        ]
      }
    }
  }

  async componentDidMount() {
    var value = await AsyncStorage.getItem('time');
    this.setState({"sessionTime": value});
    console.log("YUP", this.state.path.path);
  }

  render() {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>


                <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style= {{position: 'absolute', top:0, left: 10 }}>

                <TimerCountdown
                      initialSecondsRemaining={this.state.sessionTime * 60000}
                      onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                      //TODO: On timer end, procede to next screen
                      // onTimeElapsed={() => console.log('complete')}
                      //TODO: Style timer
                      allowFontScaling={true}
                      style={{ fontSize: 25 }}
                  />

                </View>
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
                    //this.canvas1.clear();
                    this.canvas1.addPath(this.state.path)
                  }}


                />
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
