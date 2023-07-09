import { useDispatch } from 'react-redux'
import { thunkDeleteASpot } from '../../store/spotsReducer'
import { useState, useRef, useEffect } from 'react'
import ModalDeleteSpot from './ModalReview'
import {useHistory} from 'react-router-dom'
import { useModal } from "../../context/Modal";



export default function DeleteOneSpot({ spot }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();

    const onSubmit = () => {
        dispatch(thunkDeleteASpot(spot.id))
        // history.push('/your-spots')
        closeModal()
    }


    // const [showMenu, setShowMenu] = useState(false);
    // const ulRef = useRef();

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = (e) => {
    //         if (!ulRef.current.contains(e.target)) {
    //             setShowMenu(false);
    //         }
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    // const closeMenu = () => setShowMenu(false);



    return (
        // <ModalDeleteSpot buttonText={'Delete'}  modalComponent={
            <>
                {/* <button>delete</button> */}
                <h2 className='Confirm-Delete-Spot'>Confirm Delete</h2>
                <div className='AreYouSure'>Are you sure you want to remove this spot
                    from the listings?</div>
                <button className='User-Delete-Button' onClick={onSubmit} >Yes (Delete Spot)</button>
                <button className='Cancel-Spot-Delete' onClick={closeModal}>No (Keep Spot)</button>
            </>
        // } />
    )
}
