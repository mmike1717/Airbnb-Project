
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetUsersBookings } from '../../store/bookings'
import OpenModalButton from '../Delete/ModalReview'
import DeleteBooking from '../DeleteBooking/deleteEachBooking'



export default function ManageUserBookings() {
    const dispatch = useDispatch()

    const allBookings = Object.values(useSelector(state => state.booking.userBookings))

    useEffect(() => {
        dispatch(thunkGetUsersBookings())
    }, [dispatch])

    return (
        <>
        <div>Manage Your Bookings</div>
        <div>{allBookings.map(eachBooking => {
            return (
                <div>
                    <div>{eachBooking.Spot.address}</div>
                    <div>{eachBooking.Spot.city}</div>
                    <div>{eachBooking.Spot.state}</div>
                    <div>{eachBooking.startDate}</div>
                    <div>{eachBooking.endDate}</div>
                    <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteBooking bookingId={eachBooking.id} />}/>
                </div>
            )
        })}</div>
        </>
    )
}
