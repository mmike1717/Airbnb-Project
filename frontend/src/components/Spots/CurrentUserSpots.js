import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUsersSpot } from '../../store/spotsReducer'
import { NavLink, useHistory } from 'react-router-dom'
import DeleteOneSpot from '../Delete/deleteOneSpot'
import './CurrentUserSpots.css'
import ModalDeleteSpot from '../Delete/ModalReview'
// import EditSpotForm from '../../components/Forms/EditASpotForm'



export default function CurrUserSpots() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkUsersSpot())
    }, [dispatch])

    const spots = useSelector(state => state.spots.allSpots)

    const allSpots = Object.values(spots)

    if(!Object.values(spots).length) {
        return (
            <>
                <div className='line'></div>
                <h3 className='manage-Spots-Title'>Manage Spots</h3>
                <NavLink exact={true} to='/spots/new-spot'><button className='CurrUserCreateButton'>Create a New Spot</button></NavLink>
            </>
        )
    }

    // const onClickEdit = () => {
    //     allSpots.forEach((spot) => {
    //         history.push(`/editing/${spot.id}`)

    //     })
    // }


    return (
        <>
            <div className='line'></div>
            <h3 className='manage-Spots-Title'>Manage Spots</h3>
            <NavLink exact={true} to='/spots/new-spot'><button className='CurrUserCreateButton'>Create a New Spot</button></NavLink>
            <div className='CurrUserContainer'>
                {allSpots.map((spot) => {
                    return (
                        <div key={spot.id}>
                            <NavLink className='CurrSpotContainer' key={spot.id} exact={true} to={`/details/${spot.id}`}>
                                <img className='CurrUserImages' src={spot.previewImage} />
                                <div className='UserSpot-city-rating'>
                                    <div>{spot.city}, {spot.state}</div>
                                    <div> <i className='fa fa-star' /> {!spot.avgRating ? `New` : `${Number.parseFloat(spot.avgRating).toFixed(1)}`}</div>
                                </div>
                                <div className='price'>${Number.parseFloat(spot.price).toFixed(2)} night</div>
                            </NavLink>
                            <div className='Edit-Delete-Container'>
                                <NavLink key={spot.id} className='EditingButton' exact={true} to={`/editing/${spot.id}`}><button className='User-Edit-Delete-Button'>Update</button></NavLink>
                                <ModalDeleteSpot buttonText={'Delete'}  modalComponent={<DeleteOneSpot spot={spot} />} />
                                {/* <DeleteOneSpot spot={spot} /> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* {allSpots.map((spot) => {
            return < DeleteOneSpot spot={spot} />
        })}
 {/* } */}

        </>
    )
}
