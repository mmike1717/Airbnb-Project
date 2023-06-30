
const CREATE_SPOT_FORM = 'spots/CREATE_SPOTS_FORM'
const GET_ALL_SPOTS = 'spots/GET_SPOTSS'

const actionGetSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
})


export const thunkGetAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    if(res.ok){
        const result = await res.json()
        dispatch(actionGetSpots(result))
        return result
    }
}



export default function spotsReducer (state = {}, action){
    switch (action.type){
        case GET_ALL_SPOTS : {
            return {...state, ...action.allSpots.spots}
        }
        default:
            return state
    }
}
