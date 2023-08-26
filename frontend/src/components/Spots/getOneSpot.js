import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetOneSpot } from '../../store/spotsReducer'
import { useParams, Link } from 'react-router-dom'
import ReviewBySpotId from '../Reviews/ReviewsBySpotId'
import './getOneSpot.css'
import CreateNewReview from '../Reviews/CreateNewReview'
import ModalReview from '../Delete/ModalReview'
import { useModal } from "../../context/Modal";
import CreateBookingModal from '../CreateBooking/ModalCreateBooking'
import CreateBooking from '../CreateBooking/createBooking'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { thunkCreateABooking, thunkGetSingleSpotBookings } from '../../store/bookings'



export default function GetOneSpotDetails() {
    const { spotId } = useParams()

    const { closeModal } = useModal()
    const dispatch = useDispatch()

    // const [createReviewButton, setCreateReviewButton] = useState(true)
    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)
    const reviewArr = Object.values(reviews)


    // ------------------------handles calander input-----------------
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();


    useEffect(() => {
        dispatch(thunkGetSingleSpotBookings(spotId))
    }, [spotId])

    const allDates = Object.values(useSelector(state => state.booking.spotBookings))


    const dateRanges = allDates.map(date => ({
        start: new Date(date.startDate),
        end: new Date(date.endDate)
    }))


    const handleClick = () => {
        const dates = {
            startDate,
            endDate
        }
        dispatch(thunkCreateABooking(spotId, dates))
    }


    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    // ------------------------handles calander input-----------------



    if (!spot || !Object.values(spot).length) return null
    if (spot.SpotImages === undefined) { return <></> }
    // if (!reviews || !Object.values(reviews).length) return null



    if (!Object.values(spot.SpotImages)) return null
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
            <div className='MainContainerHoldingEverything'>
                <div className='spotDetails'>
                    <h2>{spot.name}</h2>
                    <div className='spotLocation'>{spot.city}, {spot.state}, {spot.country}</div>
                    <div className='PicturesContainer'>
                        <img className='firstPicture' src={firstSpot.url} />
                        <div className='AllOtherPics'>{newArray.map((images) => {
                            return <img src={images.url} />
                        })}</div>
                    </div>
                </div>

                <div className='detailsContainer'>

                    <div className='AllDetailsOnLeftContainer'>

                        <div className='hostedByDiv'>Hosted By: {userArray[0].firstName}, {userArray[0].lastName}</div>

                        <div className='IconAndTextDescribeAnem'>
                            <div className='DivHoldingIcon'><i className="fa-solid fa-laptop-file" /></div>
                            <div>
                                <div className='DescriptionTitleText'>Great for remote work</div>
                                <div className='TextBelowTitle'>Fast wifi at 522 Mbps, plus a dedicated workspace in a common area.</div>
                            </div>
                        </div>

                        <div className='IconAndTextDescribeAnem' >
                            <div className='DivHoldingIcon'><i className="fa-solid fa-door-open" /></div>
                            <div>
                                <div className='DescriptionTitleText' >Self check-in</div>
                                <div className='TextBelowTitle'>Check yourself in with the smartlock.</div>
                            </div>
                        </div>

                        <div className='IconAndTextDescribeAnem' >
                            <div className='DivHoldingIcon'><i className="fa-solid fa-medal"></i></div>
                            <div>
                                <div className='DescriptionTitleText' >{userArray[0].firstName} is a Superhost</div>
                                <div className='TextBelowTitle' >Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                            </div>
                        </div>

                        <div className='spotDescription'> {spot.description}</div>

                        <div className='WhatOffersTitle'>What this place Offers</div>
                        <div className='ContainerHoldingAllOffers'>
                            <div className='DivWithIconAndAmen'> <i className="fa-solid fa-kitchen-set" /> Kitchen</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-laptop-file icon" /> Dedicated workspace</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-video icon" /> Security cameras on property</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-wifi icon" /> Fast wifi – 522 Mbps</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-car icon" /> Free parking on premises</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-tv icon" /> HDTV with Fire TV</div>
                            <div className='DivWithIconAndAmen' > <i className="fa-solid fa-dumbbell icon" /> Exercise equipment</div>
                        </div>

                        <div className='DivHoldingCalendar'>
                            <DatePicker
                                showIcon={true}
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                monthsShown={2}
                                inline
                            />
                        </div>

                    </div>

                    <div className='ContainerHoldingAllReserveInfo'>
                        <div className='priceAndStarCont'>
                            <div className='priceContainer'><div className='pricePerNight'>${Number.parseFloat(spot.price).toFixed(2)}</div> night</div>
                            <div className='starRevDiv'><i className="fa fa-star" /> {spot.numReviews !== 0 ? spot.avgStarRating : null}</div>
                            <div className='dot'>{spot.numReviews !== 0 ? '·' : null}</div>
                            <div className='reviewReserveDiv'>{spot.numReviews === 1 ? `${spot.numReviews} Review` : spot.numReviews !== 0 ? `${spot.numReviews} Reviews` : 'New'}</div>
                        </div>
                        {/* <div className='reserveContainer'> */}
                        <div className='ContainerHoldingDatePicker'>
                            <DatePicker
                                showIcon={true}
                                selected={startDate}
                                minDate={new Date()}
                                selectsStart
                                onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDateIntervals={dateRanges}
                            />
                            <DatePicker
                                showIcon={true}
                                selected={endDate || startDate}
                                minDate={new Date()}
                                selectsEnd
                                onChange={(date) => setEndDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDateIntervals={dateRanges}
                            />
                        </div>
                        <div>
                            <select className='SelectContainerForGuests'>
                                <option>1 guest</option>
                                <option>2 guests</option>
                                <option>3 guests</option>
                                <option>4 guests</option>
                                <option>5 guests</option>
                                <option>6 guests</option>
                                <option>7 guests</option>
                                <option>8 guests</option>
                                <option>9+ guests</option>

                            </select>
                        </div>

                        {/* </div> */}
                        <button className="ReserveButton" onClick={handleClick}>Reserve</button>

                        <div className='WontBeChargedText'>You won't be charged yet</div>

                        {/* <CreateBookingModal buttonText={'Reserve'} modalComponent={<CreateBooking spotId={spotId} />} /> */}

                    </div>
                </div>

                <div className='lineDiv'></div>
                <div className='starReviewDiv2'>
                    <div className='starRevDiv2'><i class="fa fa-star" />{spot.numReviews !== 0 ? spot.avgStarRating : null}</div>
                    <div className='dot2'>{spot.numReviews !== 0 ? '·' : null}</div>
                    <div className='reviewReserveDiv2'>{spot.numReviews === 1 ? `${spot.numReviews} Review` : spot.numReviews !== 0 ? `${spot.numReviews} Reviews` : 'New'}</div>
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
            </div>
        </>
    )
}
