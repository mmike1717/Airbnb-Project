import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import  GetAllSpots  from './components/Spots/getAllSpots'
import CreateSpotForm from "./components/Forms/CreateSpotForms";
import EditASpotForm from "./components/Forms/EditASpotForm";
import GetOneSpotDetails from "./components/Spots/getOneSpot";
import CurrUserSpots from "./components/Spots/CurrentUserSpots";
import CreateNewReview from "./components/Reviews/CreateNewReview";
import DeleteReview from "./components/Delete/DeleteReview";
import ManageUserBookings from "./components/GetUserBooking/getUserBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path={'/'}>
        <GetAllSpots />
        </Route>
        <Route exact path={'/spots/new-spot'}>
          <CreateSpotForm />
        </Route>
        <Route exact path={'/details/:spotId'}>
          <GetOneSpotDetails />
        </Route>
        <Route exact path={'/editing/:spotId'} >
          <EditASpotForm />
        </Route>
        <Route exact path={'/your-spots'}>
          <CurrUserSpots />
        </Route>
        <Route exact path={'/your-bookings'}>
          <ManageUserBookings />
        </Route>
        <Route exact path={'/newReview/:spotId'}>
          <CreateNewReview />
        </Route>
        <Route exact path={'/delete-review/:reviewId'}>
          <DeleteReview />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
