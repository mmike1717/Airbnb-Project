import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spotsReducer";

function GetAllSpots (){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    const allSpots = useSelector(state => state.spots)

    if(!Object.values(allSpots).length) return null
    const spots = Object.values(allSpots)
    // console.log(allSpots[0].name)



    return (
        <div>
            <h2>hello</h2>
            {spots.map((spot)=> {
                return <div>{`${spot.name}`}</div>
            })}
        </div>
    )

}

export default GetAllSpots;
