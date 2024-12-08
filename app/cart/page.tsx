'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
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

const Cart = () => {
  const [cart, setCart] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/api/cart`)
      .then((response) => {
        console.log(response);
        setCart(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.items.map((item: any) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Typography>{item.product.name}</Typography>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.product.price}</TableCell>
                        <TableCell>
                          ₹{item.product.price * item.quantity}
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
                <Button variant="contained" color="primary" className="mt-4">
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
