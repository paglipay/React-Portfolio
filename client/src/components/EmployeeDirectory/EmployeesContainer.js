import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchEmployees } from '../../redux'

function EmployeesContainer ({ employeeData, fetchEmployees }) {
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
          employeeData.employees.map(user => <p>{user.name.first}</p>)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    employeeData: state.employee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEmployees: () => dispatch(fetchEmployees())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContainer)
