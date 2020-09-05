import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCandidate } from '../../actions/candidates';
import './team-member.css';

export class SenateTeamMembers extends React.Component {
    
  render() {
    let senateTeamMembers = this.props.senate.map(member => {
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
		if (this.props.senate.length < 4) {
      for (let i=1; i<(5- this.props.senate.length); i++) {
        senateTeamMembers = [...senateTeamMembers, <li key={i} className="empty-roster-spot">{i}. Senate Candidate</li>]
      }
    }

		return (
        <ul className="senate-team-list">
            {senateTeamMembers}
        </ul>
		)
	}
}

const mapStateToProps = state => ({
  senate: state.user.user.senate || []
})

export default connect(mapStateToProps)(SenateTeamMembers);