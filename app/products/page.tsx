'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_APP_BASE_URL}/products`)
      .then((response) => {
        console.log('preodics ', response);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product._id} className="max-w-sm mx-auto shadow-lg">
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              ₹{product.price}
            </Typography>
            <Link href={`/products/${product._id}`} passHref>
              <Button variant="contained" color="primary" className="mt-2">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Products;
