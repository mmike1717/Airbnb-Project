import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetOneSpot } from '../../store/spotsReducer'
import { useParams, Link } from 'react-router-dom'
import ReviewBySpotId from '../Reviews/ReviewsBySpotId'
import './getOneSpot.css'
import CreateNewReview from '../Reviews/CreateNewReview'
import ModalReview from '../Delete/ModalReview'
import { useModal } from "../../context/Modal";



export default function GetOneSpotDetails() {
    const { spotId } = useParams()

    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const [createReviewButton, setCreateReviewButton] = useState(true)
    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)
    const reviewArr = Object.values(reviews)
    // if (!user) return null

    // useEffect(() => {
    //     // if(!user) return false
    //     if(user?.id === spot.ownerId) setCreateReviewButton(false)
    //     if(reviewArr.find((review) => review.userId === user?.id)) setCreateReviewButton(false)
    //     if(user?.id !== spot.ownerId && !reviewArr.find((review) => review.userId === user?.id)) setCreateReviewButton(true)
    // },[dispatch, spot, reviews])

    // console.log(user)




    if (!spot || !Object.values(spot).length) return null
    if(spot.SpotImages === undefined ) {return <></>}
    // if (!reviews || !Object.values(reviews).length) return null



    if(!Object.values(spot.SpotImages)) return null
    const imageArray = Object.values(spot.SpotImages)
    const firstSpot = imageArray[0]
    const newArray = imageArray.slice(1)
    const userArray = Object.values(spot.Owner)

    // if(!user) return false
    //     if(user?.id === spot.ownerId) setCreateReviewButton(false)
    //     if(reviewArr.find((review) => review.userId === user?.id)) setCreateReviewButton(false)
    //     if(user?.id !== spot.ownerId && !reviewArr.find((review) => review.userId === user?.id)) setCreateReviewButton(true)


    // if(user.user.id === spot.ownerId) setCreateReviewButton(false)
    // if(reviewArr.find((review) => review.userId === user.user.id)) setCreateReviewButton(false)
    // if(user.user.id !== spot.ownerId && !reviewArr.find((review) => review.userId == user.user.id)) setCreateReviewButton(true)
    return (
        <>
            <div className='lineDiv'></div>
            <div className='spotDetails'>
                <h2>{spot.name}</h2>
                <div className='spotLocation'>{spot.city}, {spot.state}, {spot.country}</div>
                <div className='PicturesContainer'>
                    <img className='firstPicture' src={firstSpot.url} />
                    <div className='AllOtherPics'>{newArray.map((images) => {
                        return <img src={images.url} />
                    })}</div>
                </div>
                <div className='detailsContainer'>
                    <div>
                        <div className='hostedByDiv'>Hosted By: {userArray[0].firstName}, {userArray[0].lastName}</div>
                        <div className='spotDescription'> {spot.description}</div>
                    </div>
                    <div className='reserveContainer'>
                        <div className='priceAndStarCont'>
                            <div className='priceContainer'><div className='pricePerNight'>${Number.parseFloat(spot.price).toFixed(2)}</div> night</div>
                            <div className='starRevDiv'><i className="fa fa-star" /> {spot.numReviews !== 0 ? spot.avgStarRating : null}</div>
                            <div className='dot'>{spot.numReviews !== 0 ? '·' : null}</div>
                            <div className='reviewReserveDiv'>{spot.numReviews === 1 ? `${spot.numReviews} Review` : spot.numReviews !== 0 ? `${spot.numReviews} Reviews`  : 'New'}</div>
                        </div>
                        <button onClick={() => alert('Feature Coming Soon')}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className='lineDiv'></div>
            <div className='starReviewDiv2'>
                <div className='starRevDiv2'><i class="fa fa-star" />{spot.numReviews !== 0 ? spot.avgStarRating : null}</div>
                <div className='dot2'>{spot.numReviews !== 0 ? '·' : null}</div>
                <div className='reviewReserveDiv2'>{spot.numReviews === 1 ? `${spot.numReviews} Review` : spot.numReviews !== 0 ? `${spot.numReviews} Reviews`  : 'New'}</div>
            </div>
            <div className="CreateReviewForSpotButton">
                {/* {createReviewButton ? <ModalReview className="ModalButton" buttonText={spot.numReviews === 0 ? "Be the first to post a review!" : 'Create A Review'} onClick={closeModal} modalComponent={<CreateNewReview spotId={spotId} />} /> : false} */}
                {
                    user && !reviewArr.find((review) => review.userId === user?.id) && user.id !== spot.ownerId ? <ModalReview className="ModalButton" buttonText={spot.numReviews === 0 ? "Be the first to post a review!" : 'Create A Review'} onClick={closeModal} modalComponent={<CreateNewReview spotId={spotId} />} /> : false
                }
            </div>
            {/* <div>
             {!user.user && user.user.id === spot.ownerId && spot.numReviews === 0 ? <ModalReview className="ModalButton" buttonText={'"Be the first to post a review!"'} onClick={closeModal} modalComponent={<CreateNewReview spotId={spotId} />} /> : false }
            </div> */}
            {/* {createReviewButton ? <button>Create</button> : false } */}
            {/* <Link to={`/newReview/${spotId}`}><button className='createReviewButtonForSpot'>Create New Review</button></Link> */}
            {/* {<Link to={`/newReview/${spotId}`}><button>Create New Review</button></Link>} */}
            <ReviewBySpotId spotId={spotId} />
        </>
    )
}
