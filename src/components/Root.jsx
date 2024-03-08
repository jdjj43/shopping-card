import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Root = ({ searchArray, handleSetSearch, handleOnSubmit, fetchApi, cart }) => {
  const location = useLocation();
  const pathRegex = /^\/detail\/(\d+)$/;
  const match = location.pathname.match(pathRegex);
  return (
    <>
      <div className="container">
        <div className="nav-bar">
          <Link to={"/"} onClick={fetchApi}><h1>Shopping Cart</h1></Link>
          <div className="right-side">

            {location.pathname === '/' && (
              <>
                <div>
                  <form className="form" onSubmit={handleOnSubmit}>
                    <input onChange={handleSetSearch} type="text" name="search" id="search" placeholder="Search some items!" value={searchArray} />
                    <button type="submit" className="btn-submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                  </form>
                </div>
                <div>
                  <Link to={"/cart/"} className="botón-carrito"><FontAwesomeIcon icon={faCartShopping} /></Link>
                </div>
              </>
            )}

            {location.pathname === '/cart/' && (
              <>
                <h3>You have: {cart.length} products.</h3>
                <button className="add-to-cart cart-detail">Checkout</button>
              </>
            )}
            {location.pathname === '/cart' && (
              <>
                <h3>You have: {cart.length} products.</h3>
                <button className="add-to-cart cart-detail">Checkout</button>
              </>
            )}

            {match && (
              <>
                <Link to={`/cart/`} className="add-to-cart cart-detail">Go to your Cart</Link>
              </>
            )}
          </div>
        </div>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}