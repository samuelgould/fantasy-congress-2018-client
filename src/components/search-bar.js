import React from 'react';
import { searchCandidates } from '../actions/candidates'

export default function(props) {
    
    const onChange = function(searchString) {
        console.log(searchString);
        props.dispatch(searchCandidates(searchString));
    };
    
    return (
        <form>
            <label htmlFor="search-bar">Search:</label>
            <input id="search-bar" type="text" placeholder="e.g. Randy Bryce" onChange={e => onChange(e.target.value)}></input>
        </form>
    )
}