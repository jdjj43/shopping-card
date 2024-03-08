import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export const Detail = ({ cart, onAddCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: null,
    title: "",
    price: null,
    description: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setProductQuantity(e.target.value);
    console.log(productQuantity);
  }

  const fetchApi = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct({
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image
      })
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [])

  if (error) return (
    <h1>{error}</h1>
  )

  return (
    <div>
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.title}/>
        </div>
        <div className="product-detail">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <div className="quantity-container">
            <input type="number" name="quantity" placeholder="Quantity" value={productQuantity} onChange={(e) => handleQuantityChange(e)} />
            <button className={cart.some(producto => producto.id === product.id) ? "add-to-cart added-to-cart" : "add-to-cart"} onClick={() => onAddCart(product, productQuantity)}>{cart.some(producto => producto.id === product.id) ? "Added To Cart" : "Add To Cart"}</button>
          </div>
        </div>
      </div>

    </div>


  )
}