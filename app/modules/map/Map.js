import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Directions from './Directions'
import Search from './Search'
import * as actions from '../../actions'
import styles from '../../styles'

const { width, height } = Dimensions.get('window')

class Map extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerStyle: { zIndex: 100 }
  }

  map = null

  state = { coords: null }

  fitToCoords = ({ coordinates }) => {
    this.setState({ coords: coordinates })
    this.map.fitToCoordinates(coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 3,
        left: width / 10,
        top: height / 10
      }
    })
  }

  render() {
    const { currentLocation, drivers, locationSet, region } = this.props
    console.log('🍕 >>>', region)
    return (
      <MapView ref={c => (this.map = c)} style={styles.map} region={region}>
        {locationSet && (
          <Marker pinColor="blue" title="Current Location" draggable coordinate={currentLocation} />
        )}
        {drivers.map(driver => <Marker key={driver.id} coordinate={driver} />)}
        <Directions coords={this.state.coords} fitToCoords={this.fitToCoords} />
        <Search />
      </MapView>
    )
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object.isRequired,
  drivers: PropTypes.array.isRequired,
  destination: PropTypes.object.isRequired,
  destinationSet: PropTypes.bool.isRequired,
  locationSet: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  region: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const {
    geolocation: {
      address,
      currentLocation,
      destination,
      destinationSet,
      drivers,
      locationSet,
      region
    }
  } = state
  return {
    address,
    currentLocation,
    destination,
    destinationSet,
    drivers,
    locationSet,
    region
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
