
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetUsersBookings } from '../../store/bookings'
import DeleteModalButton from '../DeleteBooking/ModalDeleteBooking'
import DeleteBooking from '../DeleteBooking/deleteEachBooking'
import EditABooking from '../EditBooking/editABooking'
import EditBookingModal from '../EditBooking/ModalEditBooking'
import './usersBooking.css'



export default function ManageUserBookings() {
    const dispatch = useDispatch()

    const allBookings = Object.values(useSelector(state => state.booking.userBookings))

    useEffect(() => {
        dispatch(thunkGetUsersBookings())
    }, [dispatch])

    if(!allBookings){
        return (
            <>
                <div>No Trips Planned</div>
                <div>Make a Reservation today</div>
            </>
        )
    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    return (
        <>
            <div className='lineDiv'></div>

            <div className='TripTitle'>Your Trips</div>

            <div className='upcomingrestitle'>Upcoming Reservations:</div>
            <div>{allBookings.map(eachBooking => {
                let monthNum = new Date(eachBooking?.startDate).getMonth()
                if(new Date() < new Date(eachBooking?.startDate) && new Date() < new Date(eachBooking?.endDate)){
                    return (
                        <div className='EachBookingMainContainer'>
                            <div className='BookingInfoText'>
                                <div className='NameOfBooking'>
                                    <div>{eachBooking.Spot?.name}</div>
                                </div>
                                <div className='DatesAndAddressBooking'>
                                    <div className='UserBookingDates'>
                                        <div>Dates:</div>
                                        <div>{month[monthNum]}</div>
                                        <div>{new Date(eachBooking?.startDate).getDate()} - {new Date(eachBooking?.endDate).getDate()}</div>
                                        <div>{new Date(eachBooking?.endDate).getFullYear()}</div>
                                    </div>
                                    <div className='UserBookingAddress'>
                                        <div>Address:</div>
                                        <div>{eachBooking.Spot?.address}</div>
                                        <div>{eachBooking.Spot?.city}</div>
                                        <div>{eachBooking.Spot?.state}</div>
                                        <div>{eachBooking.Spot?.country}</div>
                                    </div>
                                </div>
                                <div className='divHoldingButtons'>
                                    <EditBookingModal buttonText={'Edit Reservation'} modalComponent={<EditABooking startDate={eachBooking.startDate} endDate={eachBooking.endDate} spotId={eachBooking.spotId} bookingId={eachBooking.id}/>} />
                                    <DeleteModalButton buttonText={'Delete Reservation'} modalComponent={<DeleteBooking bookingId={eachBooking.id} />} />
                                </div>
                            </div>
                            <img className='eachBookingImg' src={eachBooking.Spot?.previewImage} />
                            {/* <button onClick={handleSwitch}>Edit</button> */}
                        </div>
                    )
                }
                return null
            })}</div>
        </>
    )
}
