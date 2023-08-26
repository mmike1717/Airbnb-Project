import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { thunkCreateNewReview, thunkEditAReview } from '../../store/reviewsReducer'
// import { useParams } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import { thunkGetOneSpot } from '../../store/spotsReducer';




export default function EditReview({reviewId, review, stars, spotId }) {
    const [editReview, setEditReview] = useState(review)
    const [editStars, setEditStars] = useState(stars)
    const [errors, setErrors] = useState({})
    const [fillStars, setFillStars] = useState(editStars);
    const { closeModal } = useModal()

    const dispatch = useDispatch()
    // const { spotId } = useParams()


    const onSubmit = (e) => {
        e.preventDefault()

        const reviewData = {
            review: editReview,
            stars: editStars
        }


        if (reviewData.errors) {
            setErrors(reviewData.errors)
        }

        dispatch(thunkEditAReview(reviewId, reviewData))
            .then(() => dispatch(thunkGetOneSpot(spotId)))
            .then(closeModal)
    }

    const disabled = review.length < 10 || stars === 0 ? true : false



    return (
        <div>
            {/* handleSubmit}> */}

            <form onSubmit={onSubmit}>
                <h3 id='RatingTitle'> How was your stay?</h3>
                {/* <div>{errors.message && <div>Review already exists for this spot</div>}</div> */}
                <textarea
                    className='ReviewTextContainer'
                    placeholder='Leave your review here...'
                    type='text'
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                />

                {/* {errors.firstName && <h5>{errors.firstName}</h5>} */}
                {/* disabled={!!errors.firstName} */}
                {/* <label>Stars: </label> */}
                {/* <input
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        type="number"
                        /> */}
                <div className='StarsContainer'>
                    <div onClick={() => { setEditStars(1) }} onMouseEnter={() => { setFillStars(1) }} onMouseLeave={() => setFillStars(stars)} className={fillStars >= 1 ? "filled" : "empty"} >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                    <div onClick={() => { setEditStars(2) }} onMouseEnter={() => { setFillStars(2) }} onMouseLeave={() => setFillStars(stars)} className={fillStars >= 2 ? "filled" : "empty"} >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                    <div onClick={() => { setEditStars(3) }} onMouseEnter={() => { setFillStars(3) }} onMouseLeave={() => setFillStars(stars)} className={fillStars >= 3 ? "filled" : "empty"} >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                    <div onClick={() => { setEditStars(4) }} onMouseEnter={() => { setFillStars(4) }} onMouseLeave={() => setFillStars(stars)} className={fillStars >= 4 ? "filled" : "empty"} >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                    <div onClick={() => { setEditStars(5) }} onMouseEnter={() => { setFillStars(5) }} onMouseLeave={() => setFillStars(stars)} className={fillStars >= 5 ? "filled" : "empty"} >
                        <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                    <div>Stars</div>
                </div>
                <button disabled={disabled} className={disabled? 'DisabledColorButton' : 'SubmitReviewButton'}>Submit Your Review</button>
            </form>
        </div>
    )
}
