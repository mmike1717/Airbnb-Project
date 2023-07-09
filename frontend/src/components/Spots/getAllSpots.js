import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spotsReducer";
import { NavLink } from 'react-router-dom'
import './getAllSpots.css'

function GetAllSpots() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    const allSpots = useSelector(state => state.spots)
    if (!allSpots || !Object.values(allSpots).length) return null


    const spots = Object.values(allSpots.allSpots)



    return (
        <div>
            <div className="line"></div>
            <nav className={'spotNavLink'}>
                {spots.map((spot) => {
                    return (
                        <NavLink className='NavLinkCont' key={spot.id} to={`/details/${spot.id}`}>
                            <div className="spotContainer" data-tooltip={`${spot.name}`}>
                                <img className="allImages" src={`${spot.previewImage}`} />
                                <div className='cityAndStars'>
                                    <div className="cityState">{`${spot.city}`},  {`${spot.state}`}</div>
                                    <div className="stars"><i className="fa-sharp fa-solid fa-star"></i> {!spot.avgRating ? `New` : `${spot.avgRating}`}</div>
                                </div>
                                <div className="price">{Number.parseFloat(spot.price).toFixed(2)} night</div>
                            </div>
                        </NavLink>

                    )
                })}

            </nav>

        </div>
    )

}

export default GetAllSpots;
