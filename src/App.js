import React from 'react';
import logo from './logo.svg';
import IncomeView from './IncomeView.js'
import HouseView from './HouseView.js'
import ResultsView from './ResultsView.js'
import './App.css';

function App() {
  const [data, setData] = React.useState({});
  const [earnings, setEarnings] = React.useState(0);
  const [hidden, setHidden] = React.useState(false);

  const calcMaxResidentialCost = (municipalityGroup, residents) => {

    const data_matrix = [
      [516, 499, 396, 349],
      [746, 717, 579, 509],
      [951, 903, 734, 651],
      [1111, 1054, 869, 775]
    ]
    const additional_persons = [139, 132, 119, 114]
    const basic_residents = Math.min(residents, 4)
    const extraResidents = residents - 4
    let cost = data_matrix[basic_residents - 1][municipalityGroup]
    if (extraResidents > 0) {
      cost += additional_persons[municipalityGroup] * extraResidents
    }
    return cost
  }
  const calcAssistance = (data, earnings) => {
    const residents = data.residentCount + data.children
    const maxResidentialCost = calcMaxResidentialCost(data.municipality, residents)
    const residentialCosts = Math.min(maxResidentialCost, data.rent)
    const EarningsAfterEarnedIncomeAllowance = Math.max(earnings / 12 - residents * 0, 0)
    const basicDeductible = Math.max(0.42 * (EarningsAfterEarnedIncomeAllowance - (597 + 99 * data.residentCount + 221 * data.children)), 0)
    console.log(residents, residentialCosts, EarningsAfterEarnedIncomeAllowance, basicDeductible)
    return Math.round(0.8 * (residentialCosts - basicDeductible))
  }
  const calcTotalEarnings = (data) => {
    let total = 0;
    for (const row of data.initialIncomeField) {
      total += row.amount * row.months
    }
    for (const resident of data.extraIncomeRows) {
      for (const row of resident) {
        total += row.amount * row.months
      }
    }
    return total;
  }
  const cleanData = receivedData => {

    const newData = { ...data, ...receivedData }
    const earnings = calcTotalEarnings(newData)
    setEarnings(earnings)
    const assistance = calcAssistance(newData, earnings)
    newData['assistance'] = isNaN(assistance) ? null : assistance
    setData(newData);
  };
  return (
    <div className="App">
      <header className="App-header">
        Kelalaskuri
      </header>
      <div style={{ display: "flex", overflow: "scroll", height: "75vh" }}>
        <div className="col-2">
          <IncomeView updateData={cleanData} totalEarnings={earnings} />
        </div>
        <div className="col-2">
          <HouseView updateData={cleanData} />
        </div>
      </div>
      <footer className="App-footer">
        <ResultsView data={data} />
      </footer>
    </div>
  );
}

export default App;
