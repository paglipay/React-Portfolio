import React, { useEffect } from 'react'

export default function CollectionsList ({ collectionData, fetchCollections }) {
  useEffect(() => {
    fetchCollections()
  }, [])
  return collectionData.loading ? (
    <h2>Loading</h2>
  ) : collectionData.error ? (
    <h2>{collectionData.error}</h2>
  ) : (
    <div>
      <h2>Collections List</h2>
      <div>
        {collectionData &&
          collectionData.collections &&
          collectionData.collections.map(user => <p><pre>{user._id} {user.name} </pre></p>)}
      </div>
    </div>
  )
}


