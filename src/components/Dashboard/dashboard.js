import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../Util/requires-login';
import FilterOptions from '../Filter/filter-options';
import Candidates from '../Candidates/candidates';
import TeamPage from '../TeamPage/team-page';
import TeamPreview from '../TeamPreview/team-preview';
import Menu from '../Menu/menu';
import './dashboard.css';

export class Dashboard extends React.Component {
    
  render() {
    let candidatesSearch = 'search desktop';
    let teamPage = 'team-page-container desktop';
    let menu;
    let teamPreview = (
      <div className='team-preview-container'>
          <TeamPreview />
      </div>
    )

    if (this.props.candidatesVisible) {
      candidatesSearch = 'search mobile-focus';
    }

    if (this.props.teamVisible) {
      teamPage = 'team-page-container mobile-focus';
      teamPreview = (
        <div className='mobile-only'></div>
      );
    }

    if (this.props.menuVisible) {
      menu = <Menu />;
    }
        
    return (
      <div className="dashboard">
        {teamPreview}
        <div className={candidatesSearch}>
          <FilterOptions />
          <Candidates />
          <a className="icon-credit" href="https://icons8.com">Icon pack by Icons8</a>
        </div>
        <div className={teamPage}>
  	    	<TeamPage />
      	</div>
        {menu}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidatesVisible: state.user.candidatesVisible,
    teamVisible: state.user.teamVisible,
    menuVisible: state.user.menuVisible
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));