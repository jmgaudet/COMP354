import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';


const DeleteProduct = (props) => {

    const [selectProduct, setSelectProduct] = useState("");
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState("");

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
            console.log(productId);
            setProduct(productJson.name);

        }

    }, [selectProduct]);

    function sendDeleteRequest() {
        axios
            .delete(`http://rocky-shore-99218.herokuapp.com/products/${productId}`)
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
                <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
                <DialogContent>
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
                    <Typography>
                        <div>
                            {product ?
                                product + " is going to be deleted. Click Delete Product to confirm."
                                :
                                "Please select a Product to delete."
                            }
                        </div>
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button onClick={e => {
                        props.handleClose();
                        setSelectProduct("");
                        setProductId("");
                        setProduct("");
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={e => {
                        sendDeleteRequest();
                        setSelectProduct("");
                        setProductId("");
                        setProduct("");
                    }}>

                        Delete Product
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default DeleteProduct;