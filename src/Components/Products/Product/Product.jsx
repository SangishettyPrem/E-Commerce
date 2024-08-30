import React from 'react'
import { Card, CardActions, Typography, CardMedia, CardContent, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia title={product.name} image={product.image.url} className={classes.media} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h5' gutterBottom>{product.name}</Typography>
          <Typography variant='h5'>{product.price.formatted_with_symbol}</Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecondary' />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label='Add to Cart' color='primary' onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>

  )
}

export default Product