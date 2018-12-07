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
      '2018-11-08':
        {selected: true, selectedColor: 'deepskyblue', image: Images.mandala, title: 'Mandala', date: '11.08.2018', creativeIQ: 6 },
      '2018-11-09':
        {selected: true, selectedColor: 'deepskyblue', image: Images.muscleTree, title: 'Muscle Tree', date: '11.09.2018', creativeIQ: 8.5 },
      '2018-11-13':
        {selected: true, selectedColor: 'deepskyblue', image: Images.reflection, title: 'Reflection', date: '11.13.2018', creativeIQ: 9},
      '2018-11-20':
        {selected: true, selectedColor: 'deepskyblue', image: Images.seaword, title: 'Seaward', date: '11.20.2018', creativeIQ: 0}
    },
    viewDay: 'NA'
  }

  render () {

    return (
      <View style={styles.container}>
        <Calendar
          minDate={'2018-10-01'} //This will be the user's membership membership date
          maxDate={'2018-12-14'} //This will be the last day of the month
          onDayPress={(day) => this.setState({ isModalVisible: true, viewDay: this.state.validEntries[day.dateString]})
          }
            //Here check if the day has a disasterpiece, if so display it
            //Use react native modals to display the artwork
          markedDates={this.state.validEntries}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.imageTitle}> {this.state.viewDay.title} </Text>
            <Text style={styles.dateTitle}> {this.state.viewDay.date} </Text>
            <Text style={styles.iqTitle}> Creative IQ: {this.state.viewDay.creativeIQ} </Text>
              <Image style={styles.disasterpieceView}
                resizeMode="contain"
                source={this.state.viewDay.image}/>
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
      width: 0.6 * SCREEN_WIDTH,
      height: 0.6 * SCREEN_HEIGHT,
      borderColor: 'black',
      borderWidth: 2,
    },
    imageTitle: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold',
        backgroundColor: 'deepskyblue'
    },
    dateTitle: {
        fontSize: 20,
    },
    iqTitle: {
        fontSize: 20,
        backgroundColor: 'deepskyblue'
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
