import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {commerce} from '../../lib/commerce';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import axios from 'axios';
import ThankYou from "../Modal/ThankYou";


const Cart = ({cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleEmptyCart = () => onEmptyCart();
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const renderProducts = async () => {
        if (cart.line_items) {
            const data = await Promise.all(cart.line_items.map(async (item) => {
              // return item;
                return commerce.products.retrieve(item.product_id);
            }));
            setProducts(data);
        }
    };
    const calcSubtotal = async () => {
        var subtotal = 0;
        if (cart.line_items) {
            cart.line_items.forEach((item) => {
                subtotal+=item.price.raw*item.quantity;
                //   return commerce.products.retrieve(item.product_id);
            });
            setSubtotal(roundPrice(subtotal));
        }
    };
    const roundPrice = (num) => {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    };
    const renderEmptyCart = () => (
        <div>
            <Typography variant="subtitle1">You have no items in your shopping cart,
                <Link className={classes.link} to="/webshop"> start adding some</Link>!
            </Typography>
            <Button className={classes.checkoutButtonEmptyCart} size="large" type="button" variant="contained"
                    color="primary" component={Link} to="/webshop">Back</Button>
            <Button className={classes.checkoutButtonEmptyCart} onClick={handleOpen} size="large"
                    type="button" variant="contained" color="primary">Checkout</Button>
        </div>
    );

    useEffect(() => {
        renderProducts();
        calcSubtotal();
    }, cart.line_items);

    if (!cart.line_items) return 'Loading';

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem, index) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem product={products[index]} item={lineItem} onUpdateCartQty={onUpdateCartQty}
                                  onRemoveFromCart={onRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {subtotal}€</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained"
                            color="primary" component={Link} to="/webshop">Back</Button>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained"
                            color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                    <Button className={classes.checkoutButton} onClick={handleOpen} size="large"
                            type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );


    const handleOpen = async () => {
        let productItems = await Promise.all(cart.line_items.map(async (item) => {
            return {product: await commerce.products.retrieve(item.product_id),item};
        }));

        cart.line_items.forEach((item, index) => {
            products[index] = {
                product_id: item.name,
                product_quantity: item.quantity,
                product_price: item.price.raw
            };
        })
        var jsonObj = {
            //participant_id: window.results.id,
            group_id: window.results.eEfficiencyGroup,
            startTime: window.results.startTime,
            endTime: new Date().toTimeString(),
            duration: (new Date().getTime() - window.results.startTime.getTime()) / 1000,
            finished: "True",
            recorded_date: new Date().toDateString(),
            filter_usage_color: window.results.filterUsageColor,
            filter_usage_efficiency: window.results.filterUsageEfficiency,
            //clicks_productinformation: window.results.clicksProductinformation,
            save_electricity_counter: window.results.saveElectricityCounter,
            e_efficiency_counter: window.results.eEfficiencyCounter,
            total_items: cart.total_items,
            subtotal: cart.subtotal.raw,
            products: products
        };
        /*axios.post("https://eu-central-1.aws.data.mongodb-api.com/app/application-0-jvtqxxv/endpoint/postData",
            {body: jsonObj}).then(res => {
            console.log(res);
            handleClickOpen();
            setOpen(true);
        });*/
        const response = await fetch('https://eu-central-1.aws.data.mongodb-api.com/app/application-0-jvtqxxv/endpoint/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObj)
        });

        if (response.ok) {
            handleClickOpen();
            setOpen(true);
        } else {
            alert('Data transfer failed!');
        }
            /*
            cart.line_items.forEach(item => {
                jsonObj["product_"+item.index()+"_id"]=item.id;
                jsonObj["product_"+item.index()+"quantity"]=item.quantity;
                jsonObj["product_"+item.index()+"_price"]=item.price.raw;
            })*/
        //setOpen(true);
        // });
    };

    const handleClickOpen = () => {
        setOpen(true);
        handleEmptyCart();
    };

    return (
        <Container>
            <ThankYou open={open} setOpen={setOpen}/>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
    );
};

export default Cart;
