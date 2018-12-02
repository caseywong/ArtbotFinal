import React, { Component } from 'react';
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, View, Button,
  TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default class StatsGraph extends Component {

  constructor(props) {
    super(props);
  }

    render () {
    const navigate = this.props.navigate;

      return (
        <View style={styles.container}>
          <Text> Use modal here again to display information </Text>
        </View>
        );
      }
}


const styles = StyleSheet.create({
      container: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
      }
});
