import React from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core'
import useStyles from './styles'
import CartItems from './CartItems/CartItems';
import { Link, useLocation } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    const EmptyCard = () => (
        <Grid container direction='column' alignItems='center' justifyContent='center' style={{ height: '50vh' }}>
            <Typography variant='h3'>Your have no items in Your shopping Cart,
                <Link to={"/"} className={classes.link}>Start Adding Some</Link>!
            </Typography>
        </Grid>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item, i) => (
                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                        <CartItems item={item} handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() => handleEmptyCart}>Empty cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" component={Link} to='/checkout'>Checkout</Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Loading...'

    return (
        <div>
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant='h2' gutterBottom>Your Shopping Cart</Typography>
                {!cart.line_items.length ? <EmptyCard /> : <FilledCart />}
            </Container>
        </div>
    )
}

export default Cart