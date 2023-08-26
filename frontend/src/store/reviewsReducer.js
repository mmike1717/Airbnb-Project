import { csrfFetch } from "./csrf"

const REVIEWS_BY_SPOT_ID = 'reviews/BY_SPOT_ID'
const CREATE_NEW_REVIEW = 'reviews/CREATE_NEW'
const DELETE_A_REVIEW = 'reviews/DELETE'
const EDIT_A_REVIEW = 'reviews/EDIT'

const actionReviewsSpotId = (reviews) => ({
    type: REVIEWS_BY_SPOT_ID,
    reviews
})


const actionCreateNewReview = (review) => ({
    type:CREATE_NEW_REVIEW,
    review

})


const actionDeleteAReview = (id) => ({
    type: DELETE_A_REVIEW,
    id
})

const actionEditAReview = (data) => ({
    type: EDIT_A_REVIEW,
    data
})



export const thunkReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok){
        const result = await res.json()
        dispatch(actionReviewsSpotId(result))
    } else {
        const error = res.json()
        return error
    }
}


export const thunkCreateNewReview = (spotId, reviewData) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reviewData)
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionCreateNewReview(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}


export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    try{const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionDeleteAReview(reviewId))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



export const thunkEditAReview = (reviewId, data) => async (dispatch) => {
    try{const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionEditAReview(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}




const initialState = {
    spot: {},
    user: {}
}


export default function reviewsReducer (state = initialState, action){
    switch (action.type) {
        case REVIEWS_BY_SPOT_ID: {
            const newState = { ...state, spot:{...state.spot} };
            newState.spot = {}
            action.reviews.Reviews.forEach((review) => {
                newState.spot[review.id] = review;
            });
            return newState;
        }
        case CREATE_NEW_REVIEW: {
            const newState = {...state, spot:{...state.spot}}
            newState.spot[action.review.id] = action.review
            return newState
        }
        case DELETE_A_REVIEW: {
            const newState = { ...state, spot:{...state.spot} }
            delete newState.spot[action.id]
            return newState
        }
        case EDIT_A_REVIEW: {
            return { ...state, spot: { [action.data.id]: action.data }}
        }
        default:
            return state
    }
}
