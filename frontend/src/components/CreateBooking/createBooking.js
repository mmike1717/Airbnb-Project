
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from "../../context/Modal";
import { thunkCreateABooking } from '../../store/bookings';


export default function CreateBooking({spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleClick = () => {

        const dates = {
            startDate,
            endDate
        }

        dispatch(thunkCreateABooking(spotId, dates))
        .then(closeModal)
    }

    return (
        <div>
            <label>Start date:</label>
            <input
                type="date"
                id="start"
                name="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End date:</label>
            <input
                type="date"
                id="end"
                name="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}
