import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [wishlist, setWishlist] = useState({});
    const [token, setToken] = useState("");
    const [cake_list, setCakeList] = useState([]);
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        const updatedCart = cartItem[itemId]
            ? { ...cartItem, [itemId]: cartItem[itemId] + 1 }
            : { ...cartItem, [itemId]: 1 };
        setCartItem(updatedCart);

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const updatedCart = {
            ...cartItem,
            [itemId]: cartItem[itemId] - 1 > 0 ? cartItem[itemId] - 1 : 0,
        };
        setCartItem(updatedCart);

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const toggleWishlist = (itemId) => {
        setWishlist((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    const addToWishlist = async (itemId) => {
        setWishlist((prev) => ({
            ...prev,
            [itemId]: true,
        }));

        if (token) {
            try {
                await axios.post(`${url}/api/wishlist/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to wishlist:", error);
            }
        }
    };

    const removeFromWishlist = async (itemId) => {
        setWishlist((prev) => {
            const updatedWishlist = { ...prev };
            delete updatedWishlist[itemId];
            return updatedWishlist;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/wishlist/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from wishlist:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItem).reduce((total, [itemId, quantity]) => {
            const item = cake_list.find((product) => product._id === itemId);
            return total + (item ? item.price * quantity : 0);
        }, 0);
    };

    const fetchCakeList = async () => {
        try {
            const response = await axios.get(`${url}/api/cake/list`);
            setCakeList(response.data.data);
        } catch (error) {
            console.error("Error fetching cake list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItem(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const loadWishlistData = async (token) => { // Corrected function name
        try {
            const response = await axios.post(`${url}/api/wishlist/get`, {}, { headers: { token } });
            setWishlist(response.data.wishData);
        } catch (error) {
            console.error("Error loading wishlist data:", error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            await fetchCakeList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await loadWishlistData(storedToken); // Call to load wishlist data
            }
        };
        initializeData();
    }, []);

    const getCount = () => {
        return Object.values(cartItem).reduce((total, quantity) => total + quantity, 0);
    };

    const contextValue = {
        cake_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        getTotalCartAmount,
        getCount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
