import React from "react";
import Header from "./Header";
import Products from "./Products";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import "./Layout.css";
const Layout = () => {
    const showCart = useSelector((state) => state.cart.showCart);
    const cartItemsList = useSelector((state) => state.cart.itemsList);
    const totalPrice = cartItemsList.reduce(
        (totalPrice, cartItem) => totalPrice + cartItem.totalPrice,
        0
    );
    return (
        <React.Fragment>
            <div className="layout">
                <Header />
                <Products />
                {showCart && <CartItems />}
                <div className="total-price">
                    <h3>Total: ${totalPrice}</h3>
                    <button className="orderBtn">Place Order</button>
                </div>{" "}
            </div>
        </React.Fragment>
    );
};

export default Layout;
