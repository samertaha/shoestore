import React from 'react';
import { useParams } from 'react-router-dom';
import { productData } from '../data';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const prod = productData.find((p) => p.id === id * 1);
    setProduct(prod);
  }, []);

  return (
    <div>
      <h3>
        {product !== null && (
          <>
            <div>{product.name}</div>
            <div>{product.description}</div>
          </>
        )}
      </h3>
    </div>
  );
}

export default Product;
