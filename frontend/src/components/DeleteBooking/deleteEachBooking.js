
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from "../../context/Modal";
import { thunkCreateABooking, thunkDeleteSingleBooking } from '../../store/bookings';



export default function DeleteBooking({bookingId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleClick= () => {
        dispatch(thunkDeleteSingleBooking(bookingId))
        .then(closeModal)
    }

    return (
        <>
            <div>Are you Sure you want to Delete this Booking?</div>
            <button onClick={handleClick}>Delete</button>
            <button>Cancel</button>
        </>
    )
}
