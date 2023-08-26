

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useModal } from "../../context/Modal";
import { thunkEditASingleBooking, thunkGetSingleSpotBookings, thunkGetUsersBookings } from '../../store/bookings';



export default function EditABooking({startDate, endDate, spotId, bookingId}) {
    const dispatch = useDispatch()
    const [editStartDate, setEditStartDate] = useState(new Date(startDate));
    const [editEndDate, setEditEndDate] = useState(new Date(endDate));
    const {closeModal} = useModal()


    useEffect(() => {
        dispatch(thunkGetSingleSpotBookings(spotId))
    }, [spotId])

    const allDates = Object.values(useSelector(state => state.booking.spotBookings))

    const filterDates = allDates.filter( (date) => {
        return date.startDate !== startDate && date.endDate !== endDate
    })


    const dateRanges = filterDates.map(date => (
        {
        start: new Date(date.startDate),
        end: new Date(date.endDate)
    }))


    const handleClick = () => {
        const dates = {
            startDate: editStartDate,
            endDate: editEndDate
        }
        dispatch(thunkEditASingleBooking(bookingId, dates))
        .then(() => dispatch(thunkGetUsersBookings()))
        .then(closeModal)
    }


    return (

        <>
            <DatePicker
                showIcon={true}
                selected={editStartDate}
                minDate={new Date()}
                selectsStart
                onChange={(date) => setEditStartDate(date)}
                startDate={editStartDate}
                endDate={editEndDate}
                excludeDateIntervals={dateRanges}
                monthsShown={2}
            />
            <DatePicker
                showIcon={true}
                selected={editEndDate}
                minDate={new Date()}
                selectsEnd
                onChange={(date) => setEditEndDate(date)}
                startDate={editStartDate}
                endDate={editEndDate}
                excludeDateIntervals={dateRanges}
                monthsShown={2}
            />
            <button onClick={() => handleClick()}>Edit Reservation</button>
        </>

    )
}
