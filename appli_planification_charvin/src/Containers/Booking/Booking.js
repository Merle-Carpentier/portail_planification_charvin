import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda'
import { allBookings } from '../../redux/actions/bookingActions'
import Authorized from '../../Components/Authorized/Authorized.js'

import './Booking.css'

export default function Booking() {

    const userCharvin = JSON.parse(localStorage.userCharvin)
    const userId = userCharvin[0].id

    useEffect(() => {
        console.log('userCharvin', userCharvin)
        console.log('userarray', userId)
    }, [])

    return (
        <>
            <Authorized />
            <h1>Booking</h1>
        </>
    )
}
