import React from 'react';


import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import ChildFriendly from '@material-ui/icons/ChildFriendly';

import ToggleButton from '@material-ui/lab/ToggleButton';
import TextField from '@material-ui/core/TextField';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

import EuroSymbol from '@material-ui/icons/EuroSymbol';

import HouseSymbol from '@material-ui/icons/House';
import RemoveIcon from '@material-ui/icons/Remove';


import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { render } from '@testing-library/react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class HouseView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rent: 0,
            includesWater: true,
            includesElectricity: false,
            includesHeating: true,
            area: 0,
            municipality: 0
        };
    };

    toggleIncludes = (val) => {
        this.setState(prevState => {
            return { [val]: !prevState[val] },
                () => this.props.updateData(this.state)
        })
    }
    handleMunicipalityChange = event => {
        this.setState({ municipality: event.target.value }, () => this.props.updateData(this.state));
    };
    render() {
        let area;
        if (this.state.includesElectricity) {
            area = (
                <TextField
                    type="number"
                    style={{ width: 200 }}
                    label={<p>Asuinpinta-ala (m<sup>2</sup>)</p>}
                    value={this.state.rent}
                    onChange={(event) => this.setState({ area: parseInt(event.target.value, 10) }, () => this.props.updateData(this.state))}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <HouseSymbol />
                            </InputAdornment>
                        ),
                    }}
                />
            )
        }

        return (
            <div className="panel">
                <div>
                    <h3>Asunnon sijaintikunta</h3>
                    <Select
                        value={this.state.municipality}
                        onChange={this.handleMunicipalityChange}>
                        <MenuItem value={0}>Helsinki</MenuItem>
                        <MenuItem value={1}>PK-seutu (pl. Helsinki)</MenuItem>
                        <MenuItem value={2}>Muut suuret kaupungit</MenuItem>
                        <MenuItem value={3}>Muut Suomi</MenuItem>
                    </Select>
                </div>
                <div>
                    <h3> Vuokra</h3>
                    <TextField
                        type="number"
                        style={{ width: 200 }}
                        label="Kuussa"
                        value={this.state.rent}
                        onChange={(event) => {

                            this.setState({ rent: event.target.value }, () => this.props.updateData(this.state))
                        }
                        }
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EuroSymbol />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div >
                    <h3> Vuokraan sisältyy</h3>
                    <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.includesWater} onChange={() => this.toggleIncludes('includesWater')} value="water" />

                                }
                                label="Vesi"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.includesHeating} onChange={() => this.toggleIncludes('includesHeating')} value="heating" />

                                }
                                label="Lämmitys"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={this.state.includesElectricity} onChange={() => this.toggleIncludes('includesElectricity')} value="electricity" />

                                }
                                label="Sähkö"
                            />
                        </FormGroup>
                    </div>
                    {area}
                </div>
            </div >
        )

    }
}

export default HouseView;