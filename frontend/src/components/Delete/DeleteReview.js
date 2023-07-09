import { useDispatch } from 'react-redux'
import { thunkDeleteReview } from '../../store/reviewsReducer'
import { useParams } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import { thunkGetOneSpot } from '../../store/spotsReducer';



export default function DeleteReview({ reviewId, spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const onSubmit = () => {
        dispatch(thunkDeleteReview(reviewId))
            .then(() => dispatch(thunkGetOneSpot(spotId)))
            .then(closeModal)
    }

    return (
        <>
            <h3 className='Delete-Review-Title'>Confirm Delete</h3>
            <div className='SureDeleteReview'>Are you sure you want to delete this review?</div>
            <button className='Confirm-Delete-Review' onClick={onSubmit} >Yes (Delete Review)</button>
            <button className='Cancel-Delete-Review' onClick={closeModal}>No (Keep Review)</button>
            {/* <button onClick={onSubmit} >Delete</button> */}
        </>
    )
}
