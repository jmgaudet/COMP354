import React, {Component} from 'react';
import "../../css/HomePage.css"

import {SearchBar} from "./SearchBar";
import ItemList from "./ItemList";
import axios from "axios";
import FilterByDropdown from "./FilterByDropdown";
import SortOrderDropdown from "./SortOrderDropdown";
import FeaturedProd from "../FeaturedProducts/FeaturedProd.js"

import logo from '../../../ImageAssets/logo.png';

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.getProductsUrl = this.getProductsUrl.bind(this);
        this.handleFilterColumnChanged = this.handleFilterColumnChanged.bind(this);
        this.handleSearchChanged = this.handleSearchChanged.bind(this);
        this.handleSortOrderChanged = this.handleSortOrderChanged.bind(this);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.loadItems = this.loadItems.bind(this);

        this.state = {
            page: 1,
            max: 8,
            sort: "",
            search: "",
            asc: true,
            pages: 1,
            items: []
        };
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        axios.get(this.getProductsUrl())
            .then((res) => {
                let response = res.data;
                if (response.is_success) {
                    this.setState({
                        items: response.contents,
                        pages: response.pages
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getProductsUrl() {
        let url = `https://rocky-shore-99218.herokuapp.com/products?page=${this.state.page}&max=${this.state.max}&sort=${this.state.sort}&search=${this.state.search}&asc=${this.state.asc}`;
        return url;
    }

    handleSearchChanged(searchValue) {
        this.setState({
            search: searchValue,
            page: 1
        }, this.loadItems);
    }

    handleFilterColumnChanged(filterColumn) {
        this.setState({
            sort: filterColumn
        }, this.loadItems);
    }

    handleSortOrderChanged(sortOrder) {
        this.setState({
            asc: sortOrder
        }, this.loadItems);
    }

    handlePageChanged(page) {
        this.setState({
            page: page
        }, this.loadItems);
    }

    render() {
        return (
            <div className="container" style={{marginLeft: 15, marginRight: 15}}>
                <div>
                    <img className="central_logo" src={logo}/>
                    <FeaturedProd/>
                    <br/><br/>
                    <h1>Browse</h1>
                    <div class="central_search_elements">

                        <SearchBar handleChange={e => this.handleSearchChanged(e.target.value)}/>
                        <br></br>
                        <div class="central_search_filters">
                            <FilterByDropdown onFilterColumnChange={c => this.handleFilterColumnChanged(c)}/>
                            <SortOrderDropdown onSortOrderChanged={o => this.handleSortOrderChanged(o)}/>
                        </div>
                    </div>
                </div>
                <br></br><br></br><br></br>
                <ItemList items={this.state.items} page={this.state.page}
                          pages={this.state.pages} max={this.state.max}
                          onPageClicked={this.handlePageChanged}/>
            </div>
        );
    }

}