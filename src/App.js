import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/Notification";
import { sendCartData, fetchData } from "./store/cartActions";

let isFirstRender = true;
function App() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    useEffect(() => {
        if (!cart.isChanged) {
            return;
        }
        if (isFirstRender) {
            isFirstRender = false;
            return;
        }
        dispatch(sendCartData(cart));
    }, [cart, dispatch]);

    return (
        <div className="App">
            {notification && (
                <Notification
                    open={notification.open}
                    type={notification.type}
                    message={notification.message}
                />
            )}
            {!isLoggedIn && <Auth />}
            {isLoggedIn && <Layout />}
        </div>
    );
}

export default App;
