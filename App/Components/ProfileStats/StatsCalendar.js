import React, { Component } from 'react';
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, View, Button,
  TextInput, TouchableOpacity, Text, Keyboard, Alert,
  Dimensions, Image } from 'react-native'
import { Images ,Metrics, Colors } from '../../Themes'
import { Calendar } from 'react-native-calendars';
  //Calendar Component Documentation: https://github.com/wix/react-native-calendars
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class StatsCalendar extends Component {

  state = {
    isModalVisible: false,
    validEntries: { //Manipulate this variable based on User entries
      //Top one will be the current date that is selected
      //Those with valid entries will be marked with dotColor
      '2018-11-08': {selected: true, selectedColor: 'deepskyblue' },
      '2018-11-09': {selected: true, selectedColor: 'deepskyblue' },
      '2018-11-13': {selected: true, selectedColor: 'deepskyblue' },
      '2018-11-20': {selected: true, selectedColor: 'deepskyblue' }
    },
  }

  render () {

    return (
      <View style={styles.container}>
        <Calendar
          minDate={'2018-10-01'} //This will be the user's membership membership date
          maxDate={'2018-12-14'} //This will be the last day of the month
          onDayPress={() => this.setState({ isModalVisible: true })}
            //Here check if the day has a disasterpiece, if so display it
            //Use react native modals to display the artwork
          markedDates={this.state.validEntries}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.imageTitle}> Muscle Tree</Text>
            <Text style={styles.dateTitle}> Date </Text>
              <Image style={styles.disasterpieceView}
                resizeMode="contain"
                source={Images.sample}/>
            <TouchableOpacity style={styles.proceedButtonWrapper}
              onPress={() => this.setState({ isModalVisible: false })}>
              <Text style={{fontSize: 18}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between'
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
    },
});
