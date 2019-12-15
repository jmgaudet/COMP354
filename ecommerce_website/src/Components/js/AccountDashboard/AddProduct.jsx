import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const AddProduct = props => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [sellerID, setSellerID] = useState(props.sellerId);
    const [manufacturer, setManufacturer] = useState("");
    const [category, setCategory] = useState("");
    const [image1, setImage1] = useState([]);


    function sendPostRequest() {
        //handle form submission

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("description", description);
        formData.append("sellerId", sellerID);
        formData.append("manufacturer", manufacturer);
        formData.append("category", category);
        formData.append("image1", image1);

        axios
            .post('https://rocky-shore-99218.herokuapp.com/products/', formData)
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
                <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the following information to create a Product:
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="productName"
                        label="Product Name"
                        fullWidth
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        fullWidth
                        type="number"
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        onChange={e => setDescription(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="category"
                        fullWidth
                        onChange={e => setCategory(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="manufacturer"
                        label="manufacturer"
                        fullWidth
                        onChange={e => setManufacturer(e.target.value)}
                    />

                    <TextField
                        id="image1"
                        type="file"
                        onChange={e => setImage1(e.target.files[0])}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={e => {
                        sendPostRequest();
                    }}>

                        Add Product
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddProduct;
