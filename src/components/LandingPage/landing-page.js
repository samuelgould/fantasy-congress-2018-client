import React from 'react';
import { connect } from 'react-redux';
// import { Portal } from '@candulabs/react-sdk';
import { Redirect } from 'react-router-dom';
import './landing-page.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='landing-page-container'>
      {/* <div className='candu'>
        <Portal slug='sam-test' />
      </div> */}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
