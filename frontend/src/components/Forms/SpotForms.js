import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkCreateASpot, thunkCreateImage, thunkEditASpot } from '../../store/spotsReducer'
import { useHistory } from 'react-router-dom'
import './CreateASpotForm.css'

import NotLoggedInMotal from '../../ExtraICreated.js/NotLoggedInPage'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

export default function SpotForm({ spotData, formType, title }) {
    const [address, setAddress] = useState(spotData.address)
    const [city, setCity] = useState(spotData.city)
    const [state, setState] = useState(spotData.state)
    const [country, setCountry] = useState(spotData.country)
    const [lat, setLat] = useState(22)
    const [lng, setLng] = useState(24)
    const [name, setName] = useState(spotData.name)
    const [description, setDescription] = useState(spotData.description)
    const [price, setPrice] = useState(spotData.price)
    const [preview, setPreview] = useState(spotData.preview)
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    // const [imageErrors, setImageErrors] = useState({})
    // const [submited, setSubmited] = useState(false)
    const history = useHistory()


    // useEffect(() => {
    //     const err = {}
    //     setErrors({})
    //     // console.log('errrrrr----', submited)
    //     if (!address.length) err.address = 'Address is required'
    //     if (!city.length) err.city = 'City is required'
    //     if (!state.length) err.state = "Must have a valid state"
    //     if (!country.length) err.country = "Must have a valid country"
    //     if (!name.length) err.name = "Must have a valid name"
    //     if (description.length < 30) err.description = "Description needs 30 or more characters"
    //     if (price < 1) err.price = "Must have a valid price"
    //     if (formType === 'Create Spot' && !preview.length) err.preview = 'Preview image is required'
    //     // if(formType === 'Edit Form' && spotData)

    //     // if (url) { errors.url = "Must have a valid url" }
    //     // if(Object.values(err).length) setSubmited(true)
    //     if (submited) {
    //         setErrors(err);
    //     }
    //     // setSubmited(true)

    // }, [submited, address, city, state, country, name, description, price, preview]);


    // //     if (!previewImage.endsWith('.jpg'))
    // //         setErrors(errors)
    // // }, [])

    const user = useSelector(state => state.session.user)
    if (user === null) {
        return (
            <>
                <div className='line'></div>
                <h1 className='TitleForNonSignInMem'>Log In/SignUp to Create a Spot</h1>
                <div className='DivForPeopleNotSignedIn'>
                <button className='NotSignedInButton'>
                    <NotLoggedInMotal
                        itemText="Log In"
                        // onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />
                </button>
                <button className='NotSignedInButton'>
                    <NotLoggedInMotal
                        itemText="Sign Up"
                        // onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </button>
                </div>
            </>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        setErrors({})
        const err = {}
        if (!address.length) err.address = 'Address is required'
        if (!city.length) err.city = 'City is required'
        if (!state.length) err.state = "Must have a valid state"
        if (!country.length) err.country = "Must have a valid country"
        if (!name.length) err.name = "Must have a valid name"
        if (description.length < 30) err.description = "Description needs 30 or more characters"
        if (price < 1) err.price = "Must have a valid price"
        if (formType === 'Create Spot' && !preview.length) err.preview = 'Preview image is required'
        if(formType === 'Create Spot' && (image1.endsWith('.png') || image1.endsWith('.jpg') || image1.endsWith('.jpeg'))) err.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        setErrors(err);
        // setSubmited(true)

        let newSpot = { ...spotData, address, city, state, country, lat, lng, name, description, price }

        if (formType === 'Create Spot' && !Object.values(err).length) {

            //if you want to refactor chain thunks together
            newSpot = await dispatch(thunkCreateASpot(newSpot))

            await dispatch(thunkCreateImage(newSpot.id, preview))

            history.push(`/details/${newSpot.id}`)


        }

        // console.log('errors', errors)
        if (formType === 'Edit Form' && !Object.values(err).length) {
            newSpot = await dispatch(thunkEditASpot(newSpot))
                .then(history.push(`/details/${newSpot.id}`))
        }

    }



    return (
        <>
            <div className='line'></div>
            <div>
                <form className='CreateSpotForm' onSubmit={handleSubmit}>
                    <h2> {title}</h2>
                    <h3>Where's your place located?</h3>
                    <div className='formText'>Guests will only get your exact address once they booked a
                        reservation.</div>
                    <div className='headersAndErrors'>
                        <label className='CountryHeader'>Country: </label>
                        {<div className='errors'>{errors.country}</div>}
                    </div>
                    <input
                        className='CountryInput'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                    />
                    <div className='headersAndErrors'>
                        <label>Street Address: </label>
                        {errors.address && <div className='errors'>{errors.address}</div>}
                    </div>
                    <input
                        className='AddressInput'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                    />
                    <div className='cityStateContainer'>
                        <div className='headersAndErrors'>
                            <label>City: </label>
                            {errors.city && <div className='errors'>{errors.city}</div>}
                        </div>
                        <div className='headersAndErrors'>
                            <label>State: </label>
                            {errors.state && <div className='errors'>{errors.state}</div>}
                        </div>
                    </div>
                    <div className='cityStateInputs'>
                        <input
                            placeholder='City'
                            className='cityInput'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                        />
                        <div className='comma1'>,</div>
                        <input
                            className='stateInput'
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                        />
                    </div>
                    <h3 id='headersId'>Describe your place to guests: </h3>
                    <div>Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.</div>
                    <textarea
                        className='descriptionText'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                    />
                    <div className='errorDiv'>{errors.description && <div className='errors'>{'Description needs a minimum of 30 characters'}</div>}</div>
                    <h3 className='CreateSpotHeader'>Create a title for your spot </h3>
                    <div>Catch guests' attention with a spot title that highlights what makes
                        your place special.</div>
                    <input
                        className='nameInput'
                        placeholder='Name of your Spot'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                    <div className='errorDiv'>{errors.name && <div className='errors'>{'Name is required'}</div>}</div>
                    <h3 className='CreateSpotHeader'>Set a base price for your spot </h3>
                    <div>Competitive pricing can help your listing stand out and rank higher
                        in search results.</div>
                    <div className='priceContainerDiv'>
                        $
                        <input
                            className='priceInput'
                            placeholder='Price per night (USD)'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                        />
                    </div>
                    <div className='errorDiv'>{errors.price && <div className='errors'>{errors.price}</div>}</div>
                    {formType === 'Create Spot'
                        ? (<>
                            <h3 className='CreateSpotHeader'>Liven up your spot with photos </h3>
                            <div>Submit a link to at least one photo to publish your spot.</div>
                            <input
                                className='imageInput'
                                placeholder='PreviewImage URL'
                                value={preview}
                                onChange={(e) => setPreview(e.target.value)}
                                type="url"
                            />
                            <div className='errorDiv'>{<div className='errors'>{errors.preview}</div>}</div>

                            <input
                                className='imageInput'
                                placeholder='Image URL'
                                value={image1}
                                onChange={(e) => setImage1(e.target.value)}
                                type="url"
                            />
                            <div>{errors.image1}</div>
                            <input
                                placeholder='Image URL'
                                className='imageInput'
                                value={image2}
                                onChange={(e) => setImage2(e.target.value)}
                                type="url"
                            />

                            <input
                                placeholder='Image URL'
                                className='imageInput'
                                value={image3}
                                onChange={(e) => setImage3(e.target.value)}
                                type="url"
                            />

                            <input
                                placeholder='Image URL'
                                className='imageInput'
                                value={image4}
                                onChange={(e) => setImage4(e.target.value)}
                                type="url"
                            />
                        </>) : (<div></div>)

                    }
                    <div className='createFormButton'>
                        <button >{formType}</button>
                    </div>
                </form>
            </div>
        </>
    )
}
