'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';

const Checkout = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');

  const handleCheckout = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/api/cart/checkout/${cartId}`,
        {
          discountCode,
        }
      )
      .then((response) => {
        console.log(response);
        setTotalPrice(response.data.data.totalPrice);
        alert('Order placed successfully');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Typography variant="h5">Checkout</Typography>
      <TextField
        label="Discount Code"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        fullWidth
        className="my-4"
      />
      <Typography variant="h6">Total Price: ₹{totalPrice}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        className="mt-4"
      >
        Place Order
      </Button>
    </div>
  );
};

export default Checkout;
