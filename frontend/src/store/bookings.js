import { csrfFetch } from "./csrf"


const CREATE_A_BOOKING = 'booking/CREATE_BOOKING'
const GET_USERS_BOOKING = 'booking/USERS_BOOKINGS'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'


const actionCreateBooking = (data) => ({
    type: CREATE_A_BOOKING,
    data
})

const actionGetUsersBooking = (data) => ({
    type: GET_USERS_BOOKING,
    data
})


const actionDeleteBooking = (id) => ({
    type: DELETE_BOOKING,
    id
})


export const thunkDeleteSingleBooking = (bookingId) => async(dispatch) => {
    try {const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionDeleteBooking(bookingId))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



export const thunkGetUsersBookings = () => async (dispatch) => {
    try {const res = await csrfFetch(`/api/bookings/current`)
    if(res.ok){
        const result = await res.json()
        dispatch(actionGetUsersBooking(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



export const thunkCreateABooking = (spotId, dates) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dates)
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionCreateBooking(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



const initialState = { spotBookings: {}, userBookings: {}}

export default function reviewsReducer (state = initialState, action){
    switch (action.type){
        case CREATE_A_BOOKING: {
            const newState = {...state, spotBookings:{...state.spotBookings}}
            newState.spotBookings[action.data.id] = action.data
            return newState
        }
        case GET_USERS_BOOKING: {
            const newState = { ...state, userBookings: {} };
            action.data.Bookings.forEach((booking) => {
                newState.userBookings[booking.id] = booking;
            });
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = { ...state, userBookings: { ...state.userBookings } }
            delete newState.userBookings[action.id]
            return newState
        }
        default:
            return state
    }
}
