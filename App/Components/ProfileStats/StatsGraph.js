import React, { Component } from 'react';
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, View, Button, Image,
  TextInput, TouchableOpacity, Text, Keyboard, Alert, FlatList, Dimensions } from 'react-native'
import { Images, Metrics, Colors } from '../../Themes'
import Modal from 'react-native-modal'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class StatsGraph extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    isModalVisible: false,
    modalImage: Images.anon,
    modalName: 'Untitled',
    modalDate: 'NA',
    modalCreativeIQ: 0,
  }

  render () {
    const navigate = this.props.navigate;
    const disasterpieces = [
      {image: Images.mandala, name: 'Mandala', date: '11.27.18', creativeIQ: 6},
      {image: Images.muscleTree, name: 'Muscle Tree', date: '11.29.18', creativeIQ: 8.5},
      {image: Images.reflection, name: 'Reflection', date: '11.30.18', creativeIQ: 9},
      {image: Images.seaword, name: 'Seaword', date: '12.3.18', creativeIQ: 0}
    ];

      return (
        <View style={styles.container}>
          <FlatList
              data={disasterpieces}
              keyExtractor={(item) => item.name + item.date}
              renderItem={({ item }) =>
                <View style={styles.sectionHeader}>
                  <Text style={styles.name}
                    onPress={()=> this.setState(
                      { isModalVisible: true,
                        modalImage: item.image,
                        modalName: item.name,
                        modalDate: item.date,
                        modalCreativeIQ: item.creativeIQ })}>{item.name}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                  <View style={{backgroundColor: 'deepskyblue', width: SCREEN_WIDTH * item.creativeIQ * 0.1 * 0.75}}>
                    <Text style={styles.iqLine}>{item.creativeIQ}</Text>
                  </View>
                </View>
              }
            />
            <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.modalView}>
                <View style={styles.textView}>
                  <Text style={styles.imageTitle}> {this.state.modalName} </Text>
                  <Text style={styles.dateTitle}> {this.state.modalDate} </Text>
                  <Text style={styles.iqTitle}> Creative IQ: {this.state.modalCreativeIQ} </Text>
                </View>
                  <Image style={styles.disasterpieceView}
                    resizeMode="contain"
                    source={this.state.modalImage}/>
                <TouchableOpacity style={styles.proceedButtonWrapper}
                  onPress={() => this.setState({ isModalVisible: false })}>
                  <Text style={{fontSize: 24, color: 'white'}}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
        );
      }
}


const styles = StyleSheet.create({
      container: {
        flex: 0.9,
        width: 0.75 * SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
      },
      sectionHeader: {
        paddingTop: 4,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 4,
      },
      name: {
        fontSize: 24,
        paddingBottom: 2,
        fontWeight: 'bold'
      },
      date: {
        fontSize: 22,
        paddingBottom: 2
      },
      iqLine: {
        fontSize: 22,
        marginRight: 5,
        paddingBottom: 2,
        fontWeight: 'bold',
        color: 'white'
      },
      modalView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      textView: {
        flex: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      disasterpieceView: {
        width: 0.75 * SCREEN_WIDTH,
        height: 0.6 * SCREEN_HEIGHT,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 25
      },
      imageTitle: {
          fontSize: 30,
          marginTop: 30,
          fontWeight: 'bold',
          backgroundColor: 'deepskyblue',
          color: 'white'
      },
      dateTitle: {
          marginTop: 10,
          fontSize: 24,
      },
      iqTitle: {
          marginTop: 10,
          fontSize: 24,
          backgroundColor: 'deepskyblue',
          color: 'white',
          marginLeft: 15
      },
      proceedButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.50 * SCREEN_WIDTH,
        height: 40,
        backgroundColor: 'deepskyblue',
        borderRadius: 25,
        marginBottom: 5,
      },
});
