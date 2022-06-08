import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(
                "https://redux-http-27f14-default-rtdb.firebaseio.com/cartItems.json"
            );
            const data = await res.json();
            return data;
        };

        dispatch(
            uiActions.showNotification({
                open: true,
                message: "Fetching Data",
                type: "warning",
            })
        );

        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));

            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Fetch Data Success!!",
                    type: "success",
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
};

// Async thunks
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                open: true,
                message: "Sending Request",
                type: "warning",
            })
        );
        const sendRequest = async () => {
            await fetch(
                "https://redux-http-27f14-default-rtdb.firebaseio.com/cartItems.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );
            // Send state as Request is successful
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Sent Request To Database Successfully",
                    type: "success",
                })
            );
        };

        try {
            await sendRequest();
        } catch (err) {
            // Send state as Request is fail
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: "Sending Request failed",
                    type: "error",
                })
            );
        }
    };
};
