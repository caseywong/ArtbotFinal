import React from 'react';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../Themes'
import Modal from 'react-native-modal';

import StatsCalendar from '../Components/ProfileStats/StatsCalendar'
import StatsGraph from '../Components/ProfileStats/StatsGraph'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ProfileScreen extends React.Component {

  state = {
    calendar: true,
    isModalVisibile: false
  }

  changeStatsDisplay = async(type) => {
    if ( type == 'Calendar') {
      this.setState({calendar: true});
      Alert.alert('Calendar');
    } else {
      this.setState({calendar: false});
      Alert.alert('Graph');
    }

  }

  render() {
    const { navigation } = this.props;

    if ( this.state.calendar ) {
      return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
              <View>
                  <Image style={styles.profilePicture}
                    source={Images.profilePic}
                    resizeMode='contain'/>
              </View>
              <Text style={styles.profileName}> Casey Wong </Text>
              <Text style={styles.profileMembership}> Member since November 2018 </Text>
            </View>

            <View style={styles.statsOptions}>
                <TouchableOpacity onPress={() => this.changeStatsDisplay('Calendar')}>
                    <Text style={styles.optionsWrapperActive}> Calendar </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeStatsDisplay('Graph')}>
                    <Text style={styles.optionsWrapper}> Statistics </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileStats}>
              <StatsCalendar />
            </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
              <View>
                  <Image style={styles.profilePicture}
                    source={Images.profilePic}
                    resizeMode='contain'/>
              </View>
              <Text style={styles.profileName}> Casey Wong </Text>
              <Text style={styles.profileMembership}> Member since November 2018 </Text>
            </View>

            <View style={styles.statsOptions}>
                <TouchableOpacity onPress={() => this.changeStatsDisplay('Calendar')}>
                    <Text style={styles.optionsWrapper}> Calendar </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeStatsDisplay('Graph')}>
                    <Text style={styles.optionsWrapperActive}> Statistics </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileStats}>
              <StatsGraph />
            </View>
        </View>
      );
    }


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
  profileInfo: {
    marginTop: 25,
    flex: 0.75,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  profilePicture: {
    height: Metrics.images.large,
    width: Metrics.images.large,
    borderRadius: Metrics.images.large * 0.5,
    borderColor: 'black',
  },
  profileName: {
    backgroundColor: 'deepskyblue',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  profileMembership: {
    marginTop: 5,
    fontSize: 20
  },
  statsOptions: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsWrapper: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsWrapperActive: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'deepskyblue'
  },
  profileStats: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
