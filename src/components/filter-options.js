import React from 'react';
import SearchBar from './search-bar';
import ChamberOption from './chamber-option';
import PartyOption from './party-option';
import StateOption from './state-option';
import IncumbentOnly from './incumbent-checkbox';
import AffordableOnly from './affordable-checkbox';
import PriceOption from './price-option';
import './filter-options.css';

export default function FilterOptions() {
    return (
        <div className="sorting-options">
            <SearchBar />
            <div className="filters">
                <div className="filter-container">
                    <PartyOption />
                    <StateOption />                  
                    <IncumbentOnly />
                </div>
                <div className="filter-container">
                    <ChamberOption /> 
                    <PriceOption />
                    <AffordableOnly />
                </div>
            </div>
        </div>
    )
}