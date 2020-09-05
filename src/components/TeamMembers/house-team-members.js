import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCandidate } from '../../actions/candidates';
import { removeTeamMember } from '../../actions/user';
import './team-member.css';

export class HouseTeamMembers extends React.Component {
    
  render() {
    let houseTeamMembers = this.props.house.map(member => {
      return (
				<Link to='/candidate' className="member-name" onClick={() => this.props.dispatch(fetchCandidate(member.candidate_id._id))}>
					<li key={member.candidate_id._id} className={member.candidate_id.party}>
						<div className="member-container">
							<div className="member-information">
								{member.candidate_id.name} ({member.candidate_id.party}-{member.candidate_id.stateAbbr})
							</div>
							<div className="member-price">${member.candidate_id.price}</div>
						</div>
					</li>
				</Link>
      )
    })
    if (this.props.house.length < 8) {
      for (let i=1; i<(9 - this.props.house.length); i++) {
        houseTeamMembers = [...houseTeamMembers, <li key={i} className="empty-roster-spot">{i}. House Candidate</li>]
      }
    }
	
		return (
			<ul>
				{houseTeamMembers}
			</ul>
		)
	}
}

const mapStateToProps = state => ({
  house: state.user.user.house || []
})

export default connect(mapStateToProps)(HouseTeamMembers);