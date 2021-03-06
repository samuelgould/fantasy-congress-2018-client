import { API_BASE_URL } from '../config'

export const CLEAR_CANDIDATE = 'CLEAR_CANDIDATE';
export const clearCandidate = () => ({
  type: CLEAR_CANDIDATE
});

export const FETCH_CANDIDATES_REQUEST = 'FETCH_CANDIDATES_REQUEST';
export const fetchCandidatesRequest = () => ({
  type: FETCH_CANDIDATES_REQUEST
});

export const FETCH_CANDIDATES_SUCCESS = 'FETCH_CANDIDATES_SUCCESS';
export const fetchCandidatesSuccess = candidates => ({
  type: FETCH_CANDIDATES_SUCCESS,
  candidates
});

export const FETCH_CANDIDATES_ERROR = 'FETCH_CANDIDATES_ERROR';
export const fetchCandidatesError = error => ({
  type: FETCH_CANDIDATES_ERROR,
  error
});

export const FETCH_CANDIDATE_REQUEST = 'FETCH_CANDIDATE_REQUEST';
export const fetchCandidateRequest = () => ({
  type: FETCH_CANDIDATE_REQUEST
});

export const FETCH_CANDIDATE_SUCCESS = 'FETCH_CANDIDATE_SUCCESS';
export const fetchCandidateSuccess = candidate => ({
  type: FETCH_CANDIDATE_SUCCESS,
  candidate
});

export const FETCH_CANDIDATE_ERROR = 'FETCH_CANDIDATE_ERROR';
export const fetchCandidateError = error => ({
  type: FETCH_CANDIDATE_ERROR,
  error
});

export const SEARCH_CANDIDATES = 'SEARCH_CANDIDATES';
export const searchCandidates = searchString => ({
	type: SEARCH_CANDIDATES,
	searchString
});

export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';
export const toggleFilters = () => ({
	type: TOGGLE_FILTERS
});

export const FILTER_CANDIDATES_BY_CHAMBER = 'FILTER_CANDIDATES_BY_CHAMBER';
export const filterCandidatesByChamber = chamber => ({
	type: FILTER_CANDIDATES_BY_CHAMBER,
	chamber
});

export const FILTER_CANDIDATES_BY_PARTY = 'FILTER_CANDIDATES_BY_PARTY';
export const filterCandidatesByParty = party => ({
	type: FILTER_CANDIDATES_BY_PARTY,
	party
});

export const FILTER_CANDIDATES_BY_STATE = 'FILTER_CANDIDATES_BY_STATE';
export const filterCandidatesByState = state => ({
	type: FILTER_CANDIDATES_BY_STATE,
	state
});

export const FILTER_CANDIDATES_BY_PRICE = 'FILTER_CANDIDATES_BY_PRICE';
export const filterCandidatesByPrice = price => ({
	type: FILTER_CANDIDATES_BY_PRICE,
	price: parseInt(price, 10) || 'any'
});

export const FILTER_ONLY_SHOW_INCUMBENTS = 'FILTER_ONLY_SHOW_INCUMBENTS';
export const filterOnlyShowIncumbents = incumbent => ({
	type: FILTER_ONLY_SHOW_INCUMBENTS,
	incumbent
});

export const FILTER_ONLY_AFFORDABLE = 'FILTER_ONLY_AFFORDABLE';
export const filterOnlyAffordable = affordable => ({
	type: FILTER_ONLY_AFFORDABLE,
	affordable
})

export const fetchCandidates = () => (dispatch, getState) => {
	dispatch(fetchCandidatesRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/candidates`, 
		{
  		method: 'GET',
  		headers: {
			'Authorization': `Bearer ${authToken}`
			}
		})
		.then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(candidates => {
			dispatch(fetchCandidatesSuccess(candidates))
		})
		.catch(err => 
			dispatch(fetchCandidatesError(err))
		)
}

export const fetchCandidate = candidateId => (dispatch, getState) => {
	dispatch(fetchCandidateRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/candidates/${candidateId}`, 
		{
		  method: 'GET',
			headers: {
				'Authorization': `Bearer ${authToken}`
			}
		})
		.then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(candidate => {
			dispatch(fetchCandidateSuccess(candidate))
		})
		.catch(err => 
			dispatch(fetchCandidateError(err))
		)
}