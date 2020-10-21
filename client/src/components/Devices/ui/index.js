import React, { useEffect } from 'react'

export default function ConfigsList ({ configData, fetchConfigs }) {
  useEffect(() => {
    fetchConfigs()
  }, [])
  return configData.loading ? (
    <h2>Loading</h2>
  ) : configData.error ? (
    <h2>{configData.error}</h2>
  ) : (
    <div>
      <h2>Configs List</h2>
      <div>
        {configData &&
          configData.configs &&
          configData.configs.map(user => <p><pre>{user._id} {user.name} </pre></p>)}
      </div>
    </div>
  )
}


