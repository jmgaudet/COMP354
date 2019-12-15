import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "../../css/Filters.css";

export default class FilterByDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleColumnChanged = this.handleColumnChanged.bind(this);
    }

    handleColumnChanged(e) {
        if (this.props.onFilterColumnChange) {
            this.props.onFilterColumnChange(e.target.value);
        }
    }

    render() {
        return (
            <div className="filter">
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Sort By:</InputLabel>
                    <Select
                        native
                        onChange={this.handleColumnChanged}
                    >
                        <option value={''}></option>
                        <option value={'name'}>Name</option>
                        <option value={'price'}>Price</option>
                        <option value={'quantity'}>Quantity</option>
                        <option value={'manufacturer'}>Manufacturer</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}