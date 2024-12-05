import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export const CartContext = createContext<any>(null);

type CartProviderProps = {
    children: ReactNode; // Properti 'children' bertipe ReactNode
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        // Contoh pengambilan data cart dari backend
         axios
      .get('http://localhost:8000/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data);  
        setCart(response.data.data)
      })
      .catch((error) => console.error('Error fetching cart:', error));
    }, []);

    const updateQuantity = async (cartId: number, quantity: number) => {
        try {
            const response = await axios.put(
                "http://localhost:8000/api/cart/update",
                {
                    cart_id: cartId, // Menggunakan cart_id
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.status) {
                // Update local state
                setCart((prev) =>
                    prev.map((item) =>
                        item.cart_id === cartId ? { ...item, quantity } : item
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };



    const removeFromCart = async (cartId: number) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/cart/remove",
                {
                    cart_id: cartId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status) {
                // Remove item from local state
                setCart((prev) =>
                    prev.filter((item) => !(item.cart_id === cartId))
                );
            }
        } catch (error) {
            console.error("Failed to remove product:", error);
        }
    };


    return (
        <CartContext.Provider value={{ cart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
