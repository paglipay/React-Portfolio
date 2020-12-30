import React from 'react'
import { connect } from 'react-redux'
import { fetchCollections, removeCollectionRequest, markCollectionAsActiveRequest } from '../../../redux'
import CollectionsList from '../ui/CollectionsTable'


const mapStateToProps = state => {
  return {
    collectionData: state.collection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCollections: () => dispatch(fetchCollections()),
    onRemovePressed: id => dispatch(removeCollectionRequest(id)), 
    onActivatePressed: id => dispatch(markCollectionAsActiveRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsList)
