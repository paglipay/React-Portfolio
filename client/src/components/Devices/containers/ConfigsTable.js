import React from 'react'
import { connect } from 'react-redux'
import { fetchConfigs, removeConfigRequest, markConfigAsActiveRequest } from '../../../redux'
import ConfigsList from '../ui/ConfigsTable'


const mapStateToProps = state => {
  return {
    configData: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConfigs: () => dispatch(fetchConfigs()),
    onRemovePressed: id => dispatch(removeConfigRequest(id)), 
    onActivatePressed: id => dispatch(markConfigAsActiveRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigsList)
