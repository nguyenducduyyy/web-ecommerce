import React from 'react'
import { useState, useEffect } from 'react';
import { getAllProducts } from '../Api';

    const ProductList = () => {
        const [products, setProducts] = useState([]);
      
        useEffect(() => {
          const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
          };
          fetchProducts();
        }, []);
      
  return (
    <div>
    {products.map((product) => (
      <div key={product._id}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    ))}
  </div>
  )
}

export default ProductList
