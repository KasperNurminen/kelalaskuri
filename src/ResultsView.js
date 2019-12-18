import React from 'react';
import './App.css';

function ResultsView(props) {
    let message = "Syöttämässäsi datassa on virheitä."
    if (props.data.assistance > 0) {
        message = "Asuntokuntasi saa asumistukea " + props.data.assistance + " euroa kuussa."
    }
    else if (!isNaN(props.data.assistance)) {
        message = "Asuntokuntasi ei saa lainkaan asumistukea."
    }
    return (
        <div>
            {message}
        </div>
    );
}

export default ResultsView;
