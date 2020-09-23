import React, { useEffect } from 'react'

export default function EmployeesList ({ employeeData, fetchEmployees }) {
  useEffect(() => {
    fetchEmployees()
  }, [])
  return employeeData.loading ? (
    <h2>Loading</h2>
  ) : employeeData.error ? (
    <h2>{employeeData.error}</h2>
  ) : (
    <div>
      <h2>Employees List</h2>
      <div>
        {employeeData &&
          employeeData.employees &&
          employeeData.employees.map(user => <p>{user.name.title} {user.name.first} {user.name.last}</p>)}
      </div>
    </div>
  )
}


