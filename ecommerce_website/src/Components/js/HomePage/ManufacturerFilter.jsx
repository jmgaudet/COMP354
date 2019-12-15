import React, {useEffect, useState} from 'react';
import "../../css/SearchBar.css";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "../../css/Filters.css";
import axios from "axios";


export const ManufacturerFilter = ({handleChange}) => {
//hook for categories
    const [allManufacturers, setAllManufacturers] = useState([]);
//get categories from api
    useEffect(() => {
        axios
            .get('https://rocky-shore-99218.herokuapp.com/manufacturers')
            .then(({data}) => {
                setAllManufacturers(data.contents);
            });
    });

//add all the categories as options
    return (
        <div className="filter">
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Manufacturer</InputLabel>
                <Select
                    native
                    onChange={handleChange}
                    autoWidth={true}
                >
                    <option value={""}></option>
                    <option value={""}>Test to incr wid</option>
                    {allManufacturers.map(manufacturer =>
                        <option value={manufacturer.name.toLowerCase()}>{manufacturer.name}</option>)}
                </Select>
            </FormControl>
        </div>
    )
};