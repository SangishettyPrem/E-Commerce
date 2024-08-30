import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'; // Use @mui/material
import { ShoppingCart } from '@material-ui/icons'; // Use @mui/icons-material
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalCartItem }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
            <img src="https://www.creativefabrica.com/wp-content/uploads/2019/02/Online-shop-shopping-shop-logo-by-DEEMKA-STUDIO-3.jpg" alt="Commerce.js" height='25px' className={classes.image} />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                <Badge badgeContent={totalCartItem} color='secondary' overlap='rectangular'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
