import React, {useEffect, useState} from 'react';
import ContainerDetailsPage from './ContainerDetailsPage';
import axios from "axios";

const ItemDetailsPage = (props) => {
    const [item, setItem] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [itemImageURL, setItemImageURL] = useState("");

    // Retrieve specific product for the details page with the id
    useEffect(() => {
        axios
            .get('https://rocky-shore-99218.herokuapp.com/products/' + props.match.params.id)
            .then(({data}) => {
                if (data.is_success) {
                    setItem(data.contents[0]);
                    setCategoryName(data.contents[0].categories[0].name);
                    setItemImageURL(data.contents[0].images[0].url);
                }
            });
    });

    return (
        <div>
            <ContainerDetailsPage
                // Retrieve and set values for the details page
                item={item}
                imageUrl={itemImageURL}
                name={item.name}
                description={item.description}
                category={categoryName}
                price={item.price}
                sellerId={item.sellerId}
                id={item.id}
            />
        </div>
    );
};

export default ItemDetailsPage;