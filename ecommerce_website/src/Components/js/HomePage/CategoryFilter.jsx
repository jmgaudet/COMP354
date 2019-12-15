import React, {useEffect, useState} from 'react';
import "../../css/SearchBar.css";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "../../css/Filters.css";
import axios from "axios";


export const CategoryFilter = ({handleChange}) => {
//hook for categories
    const [allCategories, setAllCategories] = useState([]);

//get categories from api
    useEffect(() => {
        axios
            .get('https://rocky-shore-99218.herokuapp.com/categories/')
            .then(({data}) => {
                setAllCategories(data.contents);
            });
    });

//add all the categories as options
    return (
        <div className="filter">
            <FormControl variant="outlined">
                <InputLabel htmlFor="age-native-simple" categories>
                    Categories
                </InputLabel>
                <Select
                    native
                    onChange={handleChange}
                    autoWidth={true}
                >
                    <option value={""}></option>
                    {allCategories.map(category =>
                        <option value={category.name.toLowerCase()}>{category.name}</option>)}
                </Select>
            </FormControl>
        </div>
    )
};