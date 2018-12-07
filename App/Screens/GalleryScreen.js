import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage, ListView } from 'react-native';

import { Images, Colors, Metrics } from '../Themes'
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class GalleryScreen extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const disasterpieces = [
      {image: Images.mandala, name: 'Mandala', date: '11.27.18', creativeIQ: 6},
      {image: Images.muscleTree, name: 'Muscle Tree', date: '11.29.18', creativeIQ: 8.5},
      {image: Images.reflection, name: 'Reflection', date: '11.30.18', creativeIQ: 9},
      {image: Images.seaword, name: 'Seaword', date: '12.3.18', creativeIQ: 0}];

    this.state = {
        dataSource: ds.cloneWithRows(disasterpieces),
        uri: '',
    }
  }

  static navigationOptions = {
    headerTitle: 'Gallery',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  renderRow(rowData) {

    const { navigation } = this.props;

    const imageSrc = rowData.image;
    const imageName = rowData.name;
    const imageDate = rowData.date;
    const imageIQ = rowData.creativeIQ;

    return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewDisasterpieceScreen', {imageSrc, imageName, imageDate, imageIQ})}>
          <Image style={styles.image}
            source={rowData.image}/>
        </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props;
    //Eventually pass this through props and add to this list

    return (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.galleryTitle}> Your Disasterpieces </Text>
          </View>
          <View style={styles.galleryContainer}>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
            enableEmptySections={true} />
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
  galleryTitle: {
    fontSize: 35,
    textDecorationLine: 'underline',
    backgroundColor: 'deepskyblue'
  },
  galleryContainer: {
    flex: 1,
    width: 1 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 165,
    height: 225,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  modalView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  disasterpieceView: {
    width: 0.75 * SCREEN_WIDTH,
    height: 0.75 * SCREEN_HEIGHT,
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
