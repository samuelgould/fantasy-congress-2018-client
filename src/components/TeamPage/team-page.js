import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchUser, submitTeam } from '../../actions/user';
import SenateTeamMembers from '../TeamMembers/senate-team-members';
import HouseTeamMembers from '../TeamMembers/house-team-members';
import Menu from '../Menu/menu';
import Modal from '../Util/modal';
import CandidateView from '../CandidateView/candidate-view';
import './team-page.css';

export class TeamPage extends React.Component {
	componentDidMount() {
    this.props.dispatch(fetchUser());
	}

	render() {

		const { house, senate, user } = this.props;
		let budget = this.props.budget;

		for (let i=0; i<senate.length; i++) {
			budget = budget - senate[i].candidate_id.price;
		}

		for (let i=0; i<house.length; i++) {
			budget = budget - house[i].candidate_id.price;
		}

		let budgetValue = 'exact';
		if (budget < 0) {
			budgetValue = 'overbudget'
		} if (budget > 0) {
			budgetValue = 'underbudget'
		}

		let button;
		if (senate.length === 4 && house.length === 8 && budget >= 0) {
			button = <button className='button-primary submit-button' onClick={ event => this.props.dispatch(submitTeam()) }>Submit Roster</button>
		}

		let teamPageViewing = 'team-page desktop';
		let candidateViewModal = null;
		if (!this.props.dashboardView) {
			teamPageViewing = 'team-page';
			candidateViewModal = (	
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
			)
		}
		
		let menu;
		if (this.props.menuVisible) {
      menu = <Menu />;
		}
	
		return (
			<div className={teamPageViewing}>
				{menu}
				{candidateViewModal}
				<div className="team-information-container">
					<h2 className='team-header'>
						<div className='team-name'>{user.teamName}</div> 
						<div className='manager'>Manager: {user.username}</div>
					</h2>
					<div className='budget'>
						Remaining Budget: <span className={budgetValue}>${budget}</span>
					</div>
				</div>
				<div className="submit-button-container">
					{button}
				</div>
				<div className='team-members'>
					<h3 className="chamber header">
						SENATE
					</h3>
					<SenateTeamMembers match={this.props.match} />
					<h3 className="chamber header">
						HOUSE OF REPRESENTATIVES
					</h3>
					<HouseTeamMembers match={this.props.match} />
				</div>
      		</div>
		)
	}
};

const mapStateToProps = state => ({
	user: state.user.user,
	teamVisible: state.user.teamVisible,
	menuVisible: state.user.menuVisible,
	teamSubmitted: state.user.user.teamSubmitted || false,
	senate: state.user.user.senate || [],
	house: state.user.user.house || [],
	budget: state.user.user.budget || 200
})

export default connect(mapStateToProps)(TeamPage);