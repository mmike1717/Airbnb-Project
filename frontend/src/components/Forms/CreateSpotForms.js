import SpotForm from "./SpotForms";


const CreateSpotForm = () => {
    const spotData = {
            address: '',
            city: '',
            state: '',
            country: '',
            lat: '',
            lng: '',
            name: '',
            description: '',
            price: '',
            preview: ''

    }

    const title = 'Create a New Spot'

    return (
        <SpotForm formType={'Create Spot'} spotData={spotData} title={title}/>
    )
}


export default CreateSpotForm
