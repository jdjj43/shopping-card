import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { Root } from "./components/Root";
import { Cart } from "./components/Cart";
import { Items } from "./components/Items";
import { Detail } from "./components/Detail";
import ErrorPage from "./error-page";

export const App = () => {
  const [cart, setCart] = useState([]);
  const [searchArray, setSearchArray] = useState("");
  const [items, setItems] = useState({ isLoading: true, data: [], errors: null });


  const fetchApi = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setItems({
        data: data,
        isLoading: false,
        errors: null
      })
    } catch (error) {
      setItems({
        data: null,
        isLoading: false,
        errors: error
      })
    }
  }

  useEffect(() => {
    fetchApi();
  }, [])


  const handleSetSearch = (e) => {
    setSearchArray(e.target.value);
  }

  const handleAddCart = (product, quantity) => {
    setCart((products) => [...products, {id: product.id, image: product.image, title: product.title, price: product.price, quantity: quantity}]);
  }

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((products) => products.id !== product.id));
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setItems({
          ...items,
          data: data.filter((item) =>
            item.title.toString().toLowerCase().includes(searchArray.toLowerCase())
          ),
        });
      } catch (error) {
        setItems({
          data: null,
          isLoading: false,
          errors: error
        })
      }
    }
    fetchApi();
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root searchArray={searchArray} handleSetSearch={handleSetSearch} handleOnSubmit={handleOnSubmit} fetchApi={fetchApi} cart={cart}/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Items onAddCart={handleAddCart} cart={cart} fetchedItems={items} />
        },
        {
          path: "cart/",
          element: <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
        },
        {
          path: "detail/:id",
          element: <Detail cart={cart} onAddCart={handleAddCart} />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}