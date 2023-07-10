import SpotForm from "./SpotForms";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetEditSpot } from "../../store/spotsReducer";


const EditSpotForm = () => {
    const dispatch = useDispatch()
  const { spotId } = useParams();
  const [spotData, setSpotData] = useState({})

  const title = 'Update Your Spot'
  // let spotData;
  useEffect(() => {
    const func = async () => {
      const res = await dispatch(thunkGetEditSpot(spotId))
      // .then((res)=> {setSpotData(res)})
      setSpotData(res)
    }
    func()
  },[dispatch, spotId])

  // console.log(spotData)
  // const spotData = useSelector(state => state.spots.singleSpot)

  if(!Object.values(spotData).length) return null

  if (!spotData) return(<h2>404 No Spot Found</h2>);

  return (
    <SpotForm formType={'Edit Form'} spotData={spotData} title={title}/>
  )

}

export default EditSpotForm
