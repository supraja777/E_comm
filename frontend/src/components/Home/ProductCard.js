import React, { Profiler } from "react";
import { Link } from "react-router-dom";
import {Rating} from "@material-ui/lab"

const ProductCard = ({ product }) => {

  const options = {
    readOnly: true,
    size: "large",
    precision: 0.5,
    value: product.ratings,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
