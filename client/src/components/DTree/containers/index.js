import React from 'react'
import { connect } from 'react-redux'
import { fetchCollections } from '../../../redux'
import CollectionsList from '../ui/CollectionsTable'


const mapStateToProps = state => {
  return {
    collectionData: state.collection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCollections: () => dispatch(fetchCollections())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsList)
