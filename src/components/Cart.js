import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
const Cart = () => {
    const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const toggleShowCart = () => {
        dispatch(cartActions.toggleShowCart());
    };
    return (
        <div className="cartIcon">
            <h3 onClick={toggleShowCart}>Cart: {cartTotalQuantity} Items</h3>
        </div>
    );
};

export default Cart;
