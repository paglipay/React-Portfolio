import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAppointments } from '../../redux'

function AppointmentsContainer ({ appointmentData, fetchAppointments }) {
  useEffect(() => {
    fetchAppointments()
  }, [])
  return appointmentData.loading ? (
    <h2>Loading</h2>
  ) : appointmentData.error ? (
    <h2>{appointmentData.error}</h2>
  ) : (
    <div>
      <h2>Appointment List</h2>
      <div>
        {appointmentData &&
          appointmentData.appointments &&
          appointmentData.appointments.map(appointment => <p>{appointment.name} {appointment.email}</p>)}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    appointmentData: state.appointment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAppointments: () => dispatch(fetchAppointments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentsContainer)
