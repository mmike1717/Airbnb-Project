import { csrfFetch } from "./csrf"

const CREATE_SPOT_FORM = 'spots/CREATE_SPOTS_FORM'
const GET_ALL_SPOTS = 'spots/GET_SPOTSS'
const GET_ONE_SPOT = 'spots/GET_A_SPOT'
const EDIT_A_SPOT = 'spot/EDIT_A_SPOT'
const DELETE_A_SPOT = 'spot/DELETE_ONE_SPOT'
const CURRENT_USER_SPOT = 'spot/CURR_USER_SPOT'
const CREATE_AN_IMAGE = 'image/FOR_A_SPOT'


const actionAddAnImage = (image) => ({
    type: CREATE_AN_IMAGE,
    image
})


const actionCurrUserSpots = (spots) => ({
    type: CURRENT_USER_SPOT,
    spots
})


const actionDeleteASpot = (id) => ({
    type: DELETE_A_SPOT,
    id
})


const actionGetSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
})

const actionEditASpot = (editSpot) => ({
    type: EDIT_A_SPOT,
    editSpot
})


const actionCreateASpot = (spotData) => ({
    type: CREATE_SPOT_FORM,
    spotData
})


const actionGetASpot = (oneSpot) => ({
    type: GET_ONE_SPOT,
    oneSpot
})






export const thunkCreateImage = (spotId, image) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'url': image, 'preview': true })
        })
        if (res.ok) {
            const result = await res.json()
            dispatch(actionAddAnImage(result))
            return result
        }
    } catch (e) {
        const error = e.json()
        return error
    }
}


export const thunkUsersSpot = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots/current')

        if (res.ok) {
            const result = await res.json()
            dispatch(actionCurrUserSpots(result))
            return result
        }
    } catch (e) {
        const error = e.json()
        return error
    }
}


export const thunkGetAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    if (res.ok) {
        const result = await res.json()
        dispatch(actionGetSpots(result))
        return result
    }
}


export const thunkGetOneSpot = (spotId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/spots/${spotId}`)

        if (res.ok) {
            const theSpot = await res.json()
            dispatch(actionGetASpot(theSpot))
            return theSpot
        }
    } catch (e) {
        const error = e.json()
        return error
    }
}


export const thunkCreateASpot = (data) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (res.ok) {
            const newSpot = await res.json()
            dispatch(actionCreateASpot(newSpot))
            return newSpot
        }
    } catch (e) {
        const err = await e.json()
        return err
    }
}


export const thunkEditASpot = (spot) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(spot)
        })

        if (res.ok) {
            const result = await res.json()
            dispatch(actionEditASpot(result))
            return result
        }
    } catch (e) {
        const err = await e.json()
        return err
    }
}


export const thunkGetEditSpot = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`)

        if (res.ok) {
            const result = await res.json()
            dispatch(actionGetASpot(result))
            return result
        }
    } catch (e) {
        const err = await e.json()
        return err
    }
}


export const thunkDeleteASpot = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            const result = await res.json()
            dispatch(actionDeleteASpot(spotId))
            return result
        }
    } catch (e) {
        const error = e.json()
        return error
    }
}


const initialState = {
    allSpots: {},
    singleSpot: {}
}


export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: {} };
            action.allSpots.spots.forEach((spot) => {

                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case CURRENT_USER_SPOT: {
            const newState = { ...state, allSpots: {} };
            action.spots.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case GET_ONE_SPOT: {
            let newState = { ...state, singleSpot: {} }
            newState.singleSpot = action.oneSpot
            return newState
        }
        case CREATE_SPOT_FORM: {
            const newState = { ...state }
            const newSpot = action.spotData
            newState.allSpots[action.spotData.id] = newSpot
            return newState
        }
        case EDIT_A_SPOT: {
            return { ...state, allSpots: { [action.editSpot.id]: action.editSpot }, singleSpot: { [action.editSpot.id]: action.editSpot } }
        }
        case DELETE_A_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            delete newState.allSpots[action.id]
            return newState
        }
        case CREATE_AN_IMAGE: {
            return { ...state, singleSpot: action.image }

        }
        default:
            return state
    }
}
