import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DrawerItems } from 'react-navigation'
import PropTypes from 'prop-types'

import { deviceCheck } from '../../styles'
import * as actions from '../../actions'

const avatar = require('../../../assets/avatarplaceholder.png')

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: 'white'
  },
  view: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  image: {
    height: 100,
    width: 100
  },
  drawerItem: {
    justifyContent: 'center',
    height: 40
  },
  text: {
    color: 'black',
    marginHorizontal: 16
  }
})

const Dashboard = props => {
  const signOut = () => {
    const cancel = { text: 'Cancel', onPress: () => {}, style: 'cancel' }
    const ok = { text: 'OK', onPress: props.signUserOut }
    Alert.alert('Are you sure you want to sign out?', null, [cancel, ok])
  }

  return (
    <View style={style.container}>
      <View style={style.view}>
        <Image style={style.image} source={avatar} />
      </View>
      <DrawerItems {...props} />
      <TouchableOpacity style={style.drawerItem} onPress={signOut}>
        <Text style={[style.text, { fontSize: deviceCheck(10, null) }]}>Sign Out</Text>{' '}
        {/*[style.text, {}]*/}
      </TouchableOpacity>
    </View>
  )
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired,
  signUserOut: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Dashboard)
