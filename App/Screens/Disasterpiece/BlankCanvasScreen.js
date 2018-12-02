import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'

const SCREEN_WIDTH = Dimensions.get('window').width;

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

export default class BlankCanvasScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Disasterpiece',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <RNSketchCanvas
                  containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                  canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                  defaultStrokeIndex={0}
                  defaultStrokeWidth={5}
                  closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
                  undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
                  clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
                  eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
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
                  saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
                  savePreference={() => {
                    return {
                      folder: 'RNSketchCanvas',
                      filename: String(Math.ceil(Math.random() * 100000000)),
                      transparent: false,
                      imageType: 'png'
                    }
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
