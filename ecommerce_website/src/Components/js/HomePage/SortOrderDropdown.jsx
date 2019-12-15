import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "../../css/Filters.css";

export default class SortOrderDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleSortOrderChanged = this.handleSortOrderChanged.bind(this);
    }

    handleSortOrderChanged(e) {
        if (this.props.onSortOrderChanged) {
            this.props.onSortOrderChanged(e.target.value);
        }
    }

    render() {
        return (
            <div className="filter">
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Order:</InputLabel>
                    <Select
                        native
                        onChange={this.handleSortOrderChanged}
                    >
                        <option value={''}></option>
                        <option value={'true'}>Ascending</option>
                        <option value={'false'}>Descending</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}