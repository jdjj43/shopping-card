import React from "react";
import { Link } from "react-router-dom";

export const Items = ({onAddCart, cart, fetchedItems}) => {

  const items = fetchedItems;

  if (items.errors) return <p>A network error was encountered</p>;
  if (items.isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="products-container">
        {items.data.map(product => {
          return(
            <div key={product.id} className="product-card">
              <Link to={`detail/${product.id}`}><img src={product.image} alt={product.title} /></Link>
              <p className="product-title">{product.title.slice(0,45)}</p>
              <p className="product-price">${product.price}</p>
              <Link to={`detail/${product.id}`} className="add-to-cart">Buy Now!</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}