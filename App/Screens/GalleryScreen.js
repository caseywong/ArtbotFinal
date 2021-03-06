import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage, ListView } from 'react-native';

import { Images, Colors, Metrics } from '../Themes'
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class GalleryScreen extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
        uri: '',
        dataSource: ds.cloneWithRows(props.pieces)
    };
  }

  static navigationOptions = {
    headerTitle: 'Gallery',
    headerStyle: { backgroundColor: 'deepskyblue' }
  };

  renderRow(rowData) {

    const { navigation } = this.props;

    const imageSrc = Images[rowData.img];
    const imageName = rowData.name;
    const imageDate = rowData.date;
    const imageIQ = rowData.ciq;

    return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewDisasterpieceScreen', {imageSrc, imageName, imageDate, imageIQ})}>
          <Image style={styles.image}
            source={imageSrc}/>
        </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props;
    //Eventually pass this through props and add to this list

    return (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.galleryTitle}> Disasterpieces </Text>
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
    fontSize: 40,
    backgroundColor: 'deepskyblue'
  },
  galleryContainer: {
    flex: 1,
    width: 1 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 175,
    height: 225,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    borderWidth: 3,
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

const mapStateToProps = (state, ownProps) => {
    return {
        pieces: state.pieces
    };
}

export default connect(mapStateToProps)(GalleryScreen);
