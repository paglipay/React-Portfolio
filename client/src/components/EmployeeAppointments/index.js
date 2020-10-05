import React from 'react'

function EmployeeAppointments({ appointmentData }) {
    return (
        <div>
            <h2>Appointment List</h2>
            <div>
                {appointmentData &&
                    appointmentData.appointments &&
                    appointmentData.appointments.map(appointment => <p>{appointment.name}</p>)}
            </div>
        </div>
    )
}

export default EmployeeAppointments
