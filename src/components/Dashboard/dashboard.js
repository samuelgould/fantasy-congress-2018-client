import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from '../Util/requires-login';
import FilterOptions from '../Filter/filter-options';
import Candidates from '../Candidates/candidates';
import CandidateView from '../CandidateView/candidate-view';
import TeamPage from '../TeamPage/team-page';
import TeamPreview from '../TeamPreview/team-preview';
import Menu from '../Menu/menu';
import Modal from '../Util/modal';
import './dashboard.css';

export class Dashboard extends React.Component {
    
  render() {
    let candidatesSearch = 'search desktop';
    let menu;

    if (this.props.candidatesVisible) {
      candidatesSearch = 'search mobile-focus';
		}

		const teamPage = (
			<div className='team-page-container mobile-focus'>
				<TeamPage dashboardView match={this.props.match} />
			</div>
		);
		
		let teamPreview = null;
		if (!this.props.teamVisible) {
			teamPreview = (
				<div className='team-preview-container'>
					<TeamPreview />
				</div>
			);
		}

    if (this.props.menuVisible) {
      menu = <Menu />;
    }
        
    return (
      <div className="dashboard">
				<Route
          path={`${this.props.match.url}/candidate`}
          render={() => {
            return (
              <Modal
                onClick={() => {
                  this.props.history.push(this.props.match.url);
                }}
              >
                <CandidateView />
              </Modal>
            );
          }}
        />
        {teamPreview}
        <div className={candidatesSearch}>
          <FilterOptions />
          <Candidates match={this.props.match} />
          <a className="icon-credit" href="https://icons8.com">Icon pack by Icons8</a>
        </div>
				{teamPage}
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