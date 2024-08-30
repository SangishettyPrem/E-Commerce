import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardMedia, Typography, Button, CardContent } from '@material-ui/core';

const CartItems = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button size='small' type='button' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size='small' type='button' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button type='button' variant='contained' color='secondary' onClick={() => { handleRemoveFromCart(item.id) }}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItems