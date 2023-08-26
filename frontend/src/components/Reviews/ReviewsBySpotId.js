import { thunkReviewsBySpotId } from "../../store/reviewsReducer"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DeleteReview from "../Delete/DeleteReview"
import OpenModalButton from "../Delete/ModalReview"
import EditReview from "../EditReview/editAReview"



export default function ReviewBySpotId({ spotId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkReviewsBySpotId(spotId))
    }, [dispatch, spotId])

    const sessionUser = useSelector(state => state.session)

    const reviews = useSelector(state => state.reviews)
    if (!Object.values(reviews).length) return null
    if (!Object.values(sessionUser).length) return null




    let reviewsArr = Object.values(reviews.spot)
    if(reviewsArr === undefined) return null


    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    return (
        <div className="reviewsContainer">
            {reviewsArr.toReversed().map((review) => {
                return (
                    <div className="eachReview">
                        <div>{review.User?.firstName}</div>
                        <div className="reviewDate">{month[new Date(review.createdAt).getMonth()]}, {new Date(review.createdAt).getFullYear()}</div>
                        <div>{review.review}</div>
                        <div className="EditDeleteReviewButtons">
                            {review.userId === sessionUser.user?.id ? <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />}/> : null}
                            {review.userId === sessionUser.user?.id ? <OpenModalButton buttonText={'Edit'} modalComponent={<EditReview reviewId={review.id} review={review.review} stars={review.stars} spotId={spotId} />}/> : null}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
