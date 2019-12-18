import React from 'react';
import logo from './logo.svg';
import IncomeView from './IncomeView.js'
import HouseView from './HouseView.js'
import './App.css';

function ResultsView(props) {
    console.log(props.data)
    let message = "Täytä kaikki kentät."
    if (props.data.assistance > 0) {
        message = "Saat asumistukea " + props.data.assistance + " euroa kuussa"
    }
    else if (!isNaN(props.data.assistance)) {
        message = "Et saa lainkaan asumistukea."
    }
    return (
        <div>
            {message}
        </div>
    );
}

export default ResultsView;
