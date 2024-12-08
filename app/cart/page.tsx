'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const [cart, setCart] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/cart`
      );
      setCart(response.data.data);
    } catch (error) {
      // console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return alert('Quantity cannot be less than 1.');
    }

    setUpdating(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/cart/update/${cart._id}/${itemId}`,
        { quantity }
      );
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteCartItem = async (itemId: string) => {
    setUpdating(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/cart/remove/${cart._id}/${itemId}`
      );
      fetchCart(); // Refresh the cart
    } catch (error) {
      // console.error('Error deleting cart item:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-2xl font-bold flex justify-center items-center w-full h-screen">
        <CircularProgress />
      </div>
    );
  } else if (!loading && !cart) {
    return (
      <div className="text-2xl font-bold flex justify-center items-center w-full h-screen">
        Your cart is empty
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <Typography variant="h5">Your Cart</Typography>
        <div className="mt-4">
          {cart && cart.items && cart.items.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((item: any) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Typography>{item.product.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <IconButton
                              onClick={() =>
                                updateCartItem(item._id, item.quantity - 1)
                              }
                              disabled={updating}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              variant="outlined"
                              size="small"
                              inputProps={{
                                style: { textAlign: 'center', width: '50px' },
                                readOnly: true,
                              }}
                            />
                            <IconButton
                              onClick={() =>
                                updateCartItem(item._id, item.quantity + 1)
                              }
                              disabled={updating}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>₹{item.product.price}</TableCell>
                        <TableCell>
                          ₹{item.product.price * item.quantity}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => deleteCartItem(item._id)}
                            color="error"
                            disabled={updating}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="flex justify-between items-center p-2 text-xl font-bold mt-4">
                <div>Total Price</div>
                <div>₹{cart.totalPrice}</div>
              </div>

              <Link
                href={`/checkout?cartId=${cart._id}`}
                passHref
                className="flex justify-center w-full p-8"
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  disabled={updating}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </>
          ) : (
            <Typography>No items in cart</Typography>
          )}
        </div>
      </div>
    );
  }
};

export default Cart;
