import React from 'react'
import { connect } from 'react-redux'
import { fetchConfigs } from '../../../redux'
import ConfigsList from '../ui/ConfigsTable'


const mapStateToProps = state => {
  return {
    configData: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConfigs: () => dispatch(fetchConfigs())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigsList)
