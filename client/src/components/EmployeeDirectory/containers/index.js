import React from 'react'
import { connect } from 'react-redux'
import { fetchEmployees } from '../../../redux'
import EmployeesList from '../ui/'


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
)(EmployeesList)
