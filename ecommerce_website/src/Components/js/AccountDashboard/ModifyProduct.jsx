import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';


const ModifyProduct = (props) => {

    const [selectProduct, setSelectProduct] = useState("");
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (selectProduct) {
            var productJson;
            try {
                productJson = JSON.parse(selectProduct);

            } catch (e) {
                // Oh well, but whatever...
            }
            //console.log(productJson);

            setProductId(productJson.id);
            setProduct(productJson.name);
            setPrice(productJson.price);
            setQuantity(productJson.quantity);
            setDescription(productJson.description);
            setManufacturer(productJson.manufacturer);
            setCategory(productJson.category);
        }

    }, [selectProduct]);

    function sendPutRequest() {
        //handle form submission

        const formData = new FormData();
        formData.append("name", product);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("description", description);
        formData.append("manufacturer", manufacturer);
        formData.append("category", category);


        console.log("Function called with the following info:");
        console.log(formData);
        console.log(productId);
        axios
            .put(`http://rocky-shore-99218.herokuapp.com/products/${productId}/details`, formData)
            .then(({data}) => {
                console.log(data);
            })
            .catch(function (response) {
                console.log(response);
            });

        props.handleClose();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Modify Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose a Product at modify:
                    </DialogContentText>
                    <FormControl>

                        <InputLabel htmlFor="age-native-simple">Product</InputLabel>
                        <Select
                            native
                            onChange={e => setSelectProduct(e.target.value)}
                            autoWidth={true}
                        >
                            <option value={""}></option>
                            {props.allItems.map(item =>
                                <option id={item.id} value={JSON.stringify(item)}>{item.name}</option>)}
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="productName"
                        label="Product Name"
                        fullWidth
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        fullWidth
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="category"
                        fullWidth
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="manufacturer"
                        label="manufacturer"
                        fullWidth
                        value={manufacturer}
                        onChange={e => setManufacturer(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => {
                        props.handleClose();
                        setSelectProduct("");
                        setProductId("");
                        setProduct("");
                        setPrice("");
                        setQuantity("");
                        setDescription("");
                        setManufacturer("");
                        setCategory("");
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={e => {
                        sendPutRequest();
                        setSelectProduct("");
                        setProductId("");
                        setProduct("");
                        setPrice("");
                        setQuantity("");
                        setDescription("");
                        setManufacturer("");
                        setCategory("");
                    }}>

                        Modify Product
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ModifyProduct;