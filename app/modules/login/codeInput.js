import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

class CodeInput extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: { zIndex: 100 },
  };

  state = {
    value: '',
  };

  render() {
    const { navigation } = this.props;
    const { value } = this.state;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      linearGradient: {
        position: 'absolute',
        height: hp('100%'),
        width: wp('100%'),
      },
      middleContainer: {
        height: hp('31%'),
        width: wp('80%'),
      },
      aboveInputText: {
        fontSize: wp('3%'),
        fontWeight: 'bold',
        marginBottom: hp('1.5%'),
      },
      inputContainer: {
        flex: 1,
        paddingTop: hp('5%'),
        paddingLeft: wp('5%'),
        backgroundColor: 'white',
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: wp('5%'),
        backgroundColor: 'black',
        marginBottom: hp('2.25%'),
        height: hp('9.5%'),
      },
      text: {
        color: 'white',
        paddingLeft: wp('1%'),
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
      },
      noCodeContainer: {
        width: wp('80%'),
      },
      noCodeText: {
        fontWeight: 'bold',
        fontSize: wp('3.25%'),
        textAlign: 'center',
      },
    });

    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <LinearGradient colors={['#7fbeff', '#fff', '#ff8200']} style={styles.linearGradient} />

        <View style={styles.middleContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.aboveInputText}>ENTER YOUR PHONE NUMBER</Text>
            <TextInput
              placeholder="__       __       __       __"
              placeholderStyle={{ backgroundColor: 'blue' }}
              style={{ letterSpacing: 40, fontSize: hp('3%'), fontWeight: 'bold' }}
              keyboardType="number-pad"
              name="value"
              type="number"
              onChangeText={value => {
                this.setState({ value });
              }}
              value={value}
              maxLength={4}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.text}>VERIFY Code</Text>
            <Icon name="long-arrow-right" size={wp('7.5%')} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noCodeContainer}
            // onPress={() => navigation.navigate('SocialAccount')}
          >
            <Text style={styles.noCodeText}>I DIDN'T RECEIVE A CODE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CodeInput;
