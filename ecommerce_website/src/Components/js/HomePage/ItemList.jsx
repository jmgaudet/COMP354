import React, {Component} from 'react';
import Item from './Item';
import "../../css/Items.css";
import Pagination from "material-ui-flat-pagination";

export default class ItemList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='item-list'>
                    {this.props.items.map(item => (
                        <Item key={item.id} item={item}/>
                    ))}
                </div>
                <br></br>
                <Pagination class="central_search_filters"
                            size='large'
                            limit={1}
                            offset={this.props.page - 1}
                            total={this.props.pages}
                            onClick={(e, offset) => this.props.onPageClicked(offset + 1)}
                />
            </div>
        );
    }
};