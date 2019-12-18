import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import TextField from '@material-ui/core/TextField';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import PeopleIcon from '@material-ui/icons/People';
import ChildFriendly from '@material-ui/icons/ChildFriendly';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

class IncomeView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            extraIncomeRows: [[], []],
            residentCount: 1,
            children: 0,
            municipality: 1,
            initialIncomeField: [{ amount: 0, months: 12 },
            { amount: 0, months: 12 }]
        };
    };

    handleResidentChange = (event, newResidentCount) => {
        if (!newResidentCount) {
            return
        }
        if (newResidentCount === 1) {
            this.setState(prevState => {
                const prevInitialField = [...prevState.initialIncomeField]
                prevInitialField[1] = { amount: 0, months: 12 }
                return { initialIncomeField: Array.from(prevInitialField) }
            }, () => this.props.updateData(this.state))

            this.setState(prevState => {
                const prevExtraFields = [...prevState.extraIncomeRows]
                prevExtraFields[1] = []
                return { extraIncomeRows: Array.from(prevExtraFields) }
            }, () => this.props.updateData(this.state))
        }
        this.setState({ residentCount: newResidentCount }, () => this.props.updateData(this.state))
    };


    addIncomeRow = (resident) => {
        this.setState(prevState => {
            let prevIncomeRows = [...prevState.extraIncomeRows]
            prevIncomeRows[resident] = [...prevIncomeRows[resident], { amount: 0, months: 0 }]
            return { extraIncomeRows: prevIncomeRows }
        }, () => this.props.updateData(this.state))
    }

    removeIncomeRow = (index, resident) => {
        var rows = [...this.state.extraIncomeRows];
        rows[resident].splice(index, 1);
        this.setState({ extraIncomeRows: rows }, () => this.props.updateData(this.state));
    }
    setIncomeAmount = (index, resident, value) => {
        if (index === -1) {

            this.setState(prevState => {
                const prevInitialField = [...prevState.initialIncomeField]
                prevInitialField[resident].amount = value
                return { initialIncomeField: Array.from(prevInitialField) }
            }, () => this.props.updateData(this.state))
        }
        else {
            this.setState(prevState => {
                const prevExtraFields = [...prevState.extraIncomeRows]
                prevExtraFields[resident][index].amount = value
                return { extraIncomeRows: Array.from(prevExtraFields) }
            }, () => this.props.updateData(this.state))
        }

    }
    setIncomeMonths = (index, resident, value) => {
        if (index === -1) {

            this.setState(prevState => {
                const prevInitialField = [...prevState.initialIncomeField]
                prevInitialField[resident].months = value
                return { initialIncomeField: Array.from(prevInitialField) }
            }, () => this.props.updateData(this.state))
        }
        else {
            this.setState(prevState => {
                const prevExtraFields = [...prevState.extraIncomeRows]
                prevExtraFields[resident][index].months = value
                return { extraIncomeRows: Array.from(prevExtraFields) }
            }, () => this.props.updateData(this.state))
        }
    }
    renderIncomeRow = (rowData, index, resident, label) => {
        const isFirstRow = index === -1;
        return (
            <div key={resident + "-" + index}>
                <TextField
                    type="number"
                    style={{ width: 200, maxWidth: "50%" }}
                    label={label}
                    value={rowData.amount}
                    onChange={(event) => this.setIncomeAmount(index, resident, event.target.value)}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EuroSymbol />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type="number"
                    style={{ width: 100 }}
                    onChange={(event) => this.setIncomeMonths(index, resident, event.target.value)}
                    label={isFirstRow ? "Kuukautta" : null}
                    value={rowData.months}

                    variant="outlined"
                />
                <Tooltip title={isFirstRow ? "Lisää rivi" : "Poista rivi"}>
                    <IconButton
                        style={{ marginTop: 4 }}
                        color={isFirstRow ? "primary" : "secondary"}
                        label="Testi"
                        size="medium"
                        onClick={isFirstRow ? () => this.addIncomeRow(resident) : () => this.removeIncomeRow(index, resident)}
                        aria-label="Add row">
                        {isFirstRow ? <AddIcon /> : <RemoveIcon />}
                    </IconButton>
                </Tooltip>
            </div>
        )

    }
    componentDidMount = () => {
        this.props.updateData(this.state)
    }
    render() {

        let extraIncomeRows;
        if (this.state.residentCount !== 1) {
            extraIncomeRows = (
                <div>
                    <Divider style={{ margin: "1rem" }} />
                    {this.renderIncomeRow(this.state.initialIncomeField[1], -1, 1, "Toisen asukkaan tulot")}
                    {this.state.extraIncomeRows[1].map((row, index) => this.renderIncomeRow(row, index, 1))}
                </div>
            );
        }
        const { totalEarnings } = this.props
        return (
            <div className="panel">
                <div>
                    <h3> Asukkaita</h3>
                    <ToggleButtonGroup size="large" value={this.state.residentCount} exclusive onChange={this.handleResidentChange}>

                        <ToggleButton key={1} value={1}>
                            <Tooltip title="1 ihminen">
                                <PersonIcon />
                            </Tooltip>,
                            </ToggleButton>
                        <ToggleButton key={2} value={2}>
                            <Tooltip title="2 ihmistä">
                                <PeopleIcon />
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TextField
                        type="number"
                        error={this.state.children < 0}
                        style={{ width: 100 }}
                        label="Lapsia"
                        value={this.state.children}
                        onChange={(event) => this.setState({ children: parseInt(event.target.value, 10) }, () => this.props.updateData(this.state))}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ChildFriendly />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div>
                    <h3>Tulot
                        <Tooltip title="Ruokakunnan tuloina huomioidaan ansiotulot, pääomatulot ja useat sosiaalietuudet, mm opintotuki. ">
                            <IconButton aria-label="help" color="primary">
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </h3>
                    {this.renderIncomeRow(this.state.initialIncomeField[0], -1, 0, "Omat tulot")}
                    {this.state.extraIncomeRows[0].map((row, index) => this.renderIncomeRow(row, index, 0))}
                    {extraIncomeRows}

                    <p> Tuloja yhteensä vuodessa {totalEarnings} € ({Math.round(totalEarnings / 12)} €/kk)</p>
                </div >
            </div >
        )

    }
}

export default IncomeView;