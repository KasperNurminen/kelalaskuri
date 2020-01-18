import React from 'react';
import IncomeView from './IncomeView.js'
import HouseView from './HouseView.js'
import ResultsView from './ResultsView.js'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const incomeAllowancePerMonth = 300
const waterValuePerPerson = 18

function App() {
  const [data, setData] = React.useState({});
  const [earnings, setEarnings] = React.useState(0);

  const calcMaxResidentialCost = (municipalityGroup, residents) => {

    const dataMatrix = [
      [516, 499, 396, 349],
      [746, 717, 579, 509],
      [951, 903, 734, 651],
      [1111, 1054, 869, 775]
    ]
    const additional_persons = [139, 132, 119, 114]
    const basic_residents = Math.min(residents, 4)
    const extraResidents = residents - 4
    let cost = dataMatrix[basic_residents - 1][municipalityGroup]
    if (extraResidents > 0) {
      cost += additional_persons[municipalityGroup] * extraResidents
    }
    return cost
  }
  const calcAssistance = (data, earnings) => {
    const residents = data.residentCount + data.children
    const maxResidentialCost = calcMaxResidentialCost(data.municipality, residents)
    let residentialCosts = Math.min(maxResidentialCost, data.rent)
    if (data.includesElectricity) {
      residentialCosts -= data.area * data.electricityValue
    }
    if (!data.includesWater) {
      residentialCosts += waterValuePerPerson * residents
    }
    if (!data.includesHeating) {
      residentialCosts += 41 + (residents - 1) * 14 // 41 euro for first person, 19 for the rest
    }
    const EarningsAfterEarnedIncomeAllowance = Math.max(earnings / 12 - residents * incomeAllowancePerMonth, 0)
    const basicDeductible = Math.max(0.42 * (EarningsAfterEarnedIncomeAllowance - (597 + 99 * data.residentCount + 221 * data.children)), 0)
    return Math.round(0.8 * (residentialCosts - basicDeductible) * 100) / 100
  }

  const experience = (employer, years, description) => {
    return (
      <p>{employer}</p>
      <p>{description}</p>
    )
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
  const validate = (data) => {
    return data.children >= 0
  }
  const cleanData = receivedData => {

    const newData = { ...data, ...receivedData }
    const valid = validate(newData)
    if (!valid) {
      newData['assistance'] = NaN
      setData(newData);
      return
    }
    const earnings = calcTotalEarnings(newData)
    setEarnings(earnings)
    const assistance = calcAssistance(newData, earnings)
    newData['assistance'] = isNaN(assistance) ? null : assistance
    setData(newData);
  };
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
            Asumistukilaskuri
        </Typography>
          <a href="mailto:kasper.nurminen@aalto.fi">
            <Button color="inherit">Ominaisuuspyyntö</Button>
          </a>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", overflow: "scroll", height: "73vh" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <IncomeView updateData={cleanData} totalEarnings={earnings} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HouseView updateData={cleanData} />
          </Grid>
        </Grid>
      </div>
      <div className="App-footer-container">
        <Paper
          elevation={16}
          className="App-footer">
          <ResultsView data={data} />
        </Paper>
      </div>
    </div >
  );
}

export default App;
