import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='headerUl'>
      <div>
        <NavLink className='titleName' data-tooltip='Logo' exact to="/">BnB Getaway <i className="fa fa-car-side"/>  </NavLink>
      </div>
      {isLoaded && (

        <div>
          <NavLink className='createSpotLink' exact to='/spots/new-spot'>Create A New Spot</NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
