import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import HouseSymbol from '@material-ui/icons/House';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class HouseView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rent: 0,
            electricityValue: 0.83,
            includesWater: true,
            includesElectricity: false,
            includesHeating: true,
            area: 40,
            municipality: 0
        };
    };

    toggleIncludes = (val) => {
        if(val === "includesElectricity" && !this.state.includesElectricity){
            window.setTimeout(() => document
            .getElementById("houseDetails")
            .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}),500)
        }
        this.setState(prevState => {
            return { [val]: !prevState[val] }
        }, () => this.props.updateData(this.state))
    }
    handleMunicipalityChange = event => {
        this.setState({ municipality: event.target.value }, () => this.props.updateData(this.state));
    };


    render() {
        let area;
        if (this.state.includesElectricity) {
            area = (
                <div id="houseDetails">
                    <TextField
                        type="number"
                        style={{ width: 200 }}
                        label={<span>Asuinpinta-ala (m<sup>2</sup>)</span>}
                        value={this.state.area}
                        onChange={(event) => this.setState({ area: parseFloat(event.target.value) }, () => this.props.updateData(this.state))}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <HouseSymbol />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="number"
                        style={{ width: 200 }}
                        label={<span>Sähkön raha-arvo /m<sup>2</sup>/kk</span>}
                        value={this.state.electricityValue}
                        onChange={(event) => this.setState({ electricityValue: parseFloat(event.target.value) }, () => this.props.updateData(this.state))}
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