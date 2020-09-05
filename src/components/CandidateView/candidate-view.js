import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requiresLogin from '../Util/requires-login';
import TwitterTimeline from './twitter-timeline';
import { clearCandidate } from '../../actions/candidates';
import { addCandidate, removeTeamMember } from '../../actions/user';
import './candidate-view.css';

export class CandidateView extends React.Component {
	componentWillUnmount() {
		this.props.dispatch(clearCandidate());
	}

  render() {
  	if (!this.props.candidateSelected) {
      return <Redirect to="/dashboard" />;
    }
        
  	if (!this.props.candidate) {
      return (
        <div className="individual-candidate-container"></div>
      )
    }

    const candidate = this.props.candidate;
    const senate = this.props.senate;
		const house = this.props.house;
        
    let budget = this.props.budget;
    let individualCandidate;

    for (let i=0; i<senate.length; i++) {
      budget = budget - senate[i].candidate_id.price;
    }
    
    for (let i=0; i<house.length; i++) {
      budget = budget - house[i].candidate_id.price;
    }

    let button;

    if (senate.length < 4 && candidate.chamber === 'Senate') {
      button = <button className='button-primary' value={candidate._id} onClick={ event => this.props.dispatch(addCandidate(event.currentTarget.value, 'senate')) }>Add</button>
		}

    if (house.length < 8 && candidate.chamber === 'House') {
      button = <button className='button-primary' value={candidate._id} onClick={ event => this.props.dispatch(addCandidate(event.currentTarget.value, 'house')) }>Add</button>
		}
		
		if (candidate.chamber === 'Senate') {
			for (let i=0; i<senate.length; i++){
        if (candidate._id === senate[i].candidate_id._id) {
					button = <button className='button-tertiary' value={senate[i]._id} onClick={ event => this.props.dispatch(removeTeamMember(event.currentTarget.value, 'senate')) }>Remove</button>;
        }
      }
		} else {
			for (let i=0; i<house.length; i++){
        if (candidate._id === house[i].candidate_id._id) {
          button = button = <button className='button-tertiary' value={house[i]._id} onClick={ event => this.props.dispatch(removeTeamMember(event.currentTarget.value, 'house')) }>Remove</button>;
        }
      }
		}

    let party;

    if (candidate.party === 'D') {
      party = 'Democrat';
    } else if (candidate.party === 'R') {
      party = 'Republican';
    } else {
      party = 'Independent';
    }

    let chamber;

    if (candidate.chamber === 'Senate') {
      chamber = 'Senate';
    } else {
      chamber = 'House of Representatives';
    }

    let district;

    if (!candidate.district) {
      district = '';
    } else if (candidate.district === 1 || candidate.district === 21 || candidate.district === 31 || candidate.district === 41 || candidate.district === 51) {
      district = candidate.district + 'st';
    } else if (candidate.district === 2 || candidate.district === 22 || candidate.district === 32 || candidate.district === 42 || candidate.district === 52) {
      district = candidate.district + 'nd';
    } else if (candidate.district === 3 || candidate.district === 23 || candidate.district === 33 || candidate.district === 43 || candidate.district === 53) {
      district = candidate.district + 'rd';
    } else {
      district = candidate.district + 'th';
    }

    let affordibility = 'price-affordable';

    if (candidate.price > budget) {
    	affordibility = 'price-too-expensive';
    }
            
    let twitterTimeline;

    if (this.props.candidate.twitterHandle) {
      twitterTimeline = (
				<div className='twitter-timeline-container'>
					<TwitterTimeline twitterHandle={'SpeakerPelosi'} />
				</div>
      )
		}
		
		const closeIcon = (
			<div className='close-container'>
				<div className='close-stripe left-stripe'></div>
				<div className='close-stripe right-stripe'></div>
			</div>
		);

    individualCandidate = (
      <div className="individual-candidate-container">
        <div className="individual-candidate-information">
					{closeIcon}
          <div className="candidate-details">
            <div className="individual-candidate-name">{candidate.name}</div>
            <div>{party}</div>
            <br />
            <div className="candidate-congress-info">{chamber}</div>
            <div>{candidate.state} {district}</div>
            <br />
            <div className={affordibility}>Price: ${candidate.price}</div>
            {button}
          </div>
          {twitterTimeline}
        </div>
      </div>
		);
	
    return (
    	<div className="candidate-view">
        {individualCandidate}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidateSelected: state.candidates.candidateSelected,
    candidate: state.candidates.candidate,
    menuVisible: state.user.menuVisible,
    senate: state.user.user.senate || [],
    house: state.user.user.house || [],
    budget: state.user.user.budget
  };
};

export default requiresLogin()(connect(mapStateToProps)(CandidateView));