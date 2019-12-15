import React, {Component} from 'react';
import '../../css/FeaturedProd.css';
import Item from '../HomePage/Item';
import axios from "axios";

class FeaturedProd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: props.amount ? props.amount : 5,
            items: []
        };

        this.getFeaturedProductsUrl = this.getFeaturedProductsUrl.bind(this);
        this.fetchFeaturedProducts = this.fetchFeaturedProducts.bind(this);
    }

    getFeaturedProductsUrl() {
        return `https://rocky-shore-99218.herokuapp.com/products/featured?amount=${this.props.amount}`;
    }

    componentDidMount() {
        this.fetchFeaturedProducts();
    }

    fetchFeaturedProducts() {
        axios.get(this.getFeaturedProductsUrl())
            .then((res) => {
                let response = res.data;
                if (response.is_success) {
                    this.setState({
                        items: response.contents,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <h1>Featured Products</h1>
                <div className="scrolling-wrapper">
                    {
                        this.state.items.map(item => {
                            return (
                                <div className="card">
                                    <Item key={item.id} item={item}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default FeaturedProd;