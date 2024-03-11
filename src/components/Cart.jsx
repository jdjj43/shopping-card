import React, { useMemo } from "react";

export const Cart = ({ cart, handleRemoveFromCart }) => {

  const total= useMemo(() => {
    return cart.reduce((x, y) => x+y.price * y.quantity, 0);
  }, [cart])
  if (cart.length === 0) return (
    <>
      <h1 className="cart-h1">Your Cart</h1>
      <p>There's no item in your cart!</p>
    </>
  )
  return (
    <>
      <h1 className="cart-h1">Your Cart</h1>
      <div className="products-container">
        {cart.map(product => {
          return (
            <div key={product.id} className="product-card product-card-cart">
              <img src={product.image} alt={product.title} />
              <p className="product-title">{product.title.slice(0, 45)}</p>
              <p className="product-price">${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleRemoveFromCart(product)} className="remove-btn">Remove From Cart</button>
            </div>
          )
        })}
      </div>
      <div className="total">
        <h2>Total: ${total}</h2>
      </div>
    </>
  )
}