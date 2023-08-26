
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from "../../context/Modal";
import { thunkCreateABooking, thunkDeleteSingleBooking } from '../../store/bookings';
import './deleteBooking.css'


export default function DeleteBooking({bookingId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleClick= () => {
        dispatch(thunkDeleteSingleBooking(bookingId))
        .then(closeModal)
    }

    return (
        <div className='DivHoldingDeleteInfo'>
            <div className='AreYouSureDelete'>Are you Sure you want to Delete this Booking?</div>
            <button className='BookingDeleteButtons' onClick={handleClick}>Delete</button>
            <button className='BookingDeleteButtons' onClick={closeModal}>Cancel</button>
        </div>
    )
}
