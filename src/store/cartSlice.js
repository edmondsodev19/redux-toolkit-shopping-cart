import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        isChanged: false,
    },
    reducers: {
        replaceData(state, action) {
            if (action.payload) {
                state.totalQuantity = action.payload.totalQuantity;
                state.itemsList = action.payload.itemsList;
            }
        },
        addToCart(state, action) {
            state.isChanged = true;
            const newItem = action.payload;
            // to check if is already available
            const existingItems = state.itemsList.find(
                (item) => item.id === newItem.id
            );

            if (existingItems) {
                existingItems.quantity++;
                existingItems.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            state.isChanged = true;
            const id = action.payload;
            const targetItem = state.itemsList.find(
                (item) => item.id === action.payload
            );
            if (targetItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(
                    (item) => item.id !== id
                );
                state.totalQuantity--;
            } else {
                targetItem.quantity--;
                targetItem.totalPrice =
                    targetItem.totalPrice - targetItem.price;
            }
        },
        setShowCart(state) {
            state.showCart = true;
        },
        toggleShowCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
