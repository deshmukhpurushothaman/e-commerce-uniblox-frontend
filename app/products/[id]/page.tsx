'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleAddToCart = () => {
    axios
      .post('/api/cart', { productId: product._id, quantity })
      .then(() => alert('Added to cart'))
      .catch((error) => console.log(error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6" color="textSecondary">
        ₹{product.price}
      </Typography>
      <img src={product.imageUrl} alt={product.name} className="w-full my-4" />
      <div>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          inputProps={{ min: 1 }}
          className="mr-2"
        />
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
