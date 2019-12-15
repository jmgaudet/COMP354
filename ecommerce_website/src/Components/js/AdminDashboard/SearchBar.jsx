import React from "react";
import "../../css/SearchBar.css";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

export const SearchBar = ({handleChange}) => (
    <div className="outer-container" class="central_search_bar">
        <TextField
            id="searchBar"
            type="search"
            margin="normal"
            variant="outlined"
            placeholder="Search for anything..."
            /*label="Search for anything"*/
            //fullWidth
            style={{width: 300}}

            onChange={handleChange}
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
            }}
        />
    </div>
);

