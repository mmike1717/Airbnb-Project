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
        <>
            {/* <div className="MainPictureContainer">
                <img className="HomePagePicture" src="https://www.thoughtco.com/thmb/xsXofufWyqkNhc1MZwQqtm9ivNY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/empire-state-building-and-skyline--new-york--usa-668600163-5aabde2843a1030036f90d9a.jpg"/>
                <img className="HomePagePicture" src="https://media.istockphoto.com/id/1141114423/photo/chicago-skyline-aerial-drone-view-from-above-lake-michigan-and-city-of-chicago-downtown.jpg"/>
                <div className="LargePictureTitle">Welcome to BnB Getaway</div>
                <div className="MainSearchContainer">
                    <div>Anywhere</div>
                    <div>Any week</div>
                    <div>Add guests</div>
                    <div><i class="fa-solid fa-magnifying-glass"/></div>
                </div>
            </div> */}
        <div>
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
        </>
    )

}

export default GetAllSpots;
