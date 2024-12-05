import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { CartContext } from './component/CartContext';
import axios from "axios";

type Product = {
  cart_id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

const CheckOutPage = () => {
  const { cart } = useContext(CartContext); // Using cart data from context
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || cart;

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For error handling
  const [shippingMethod, setShippingMethod] = useState('JNE'); // Default value
  const [paymentMethod, setPaymentMethod] = useState('MANDIRI'); // Default value
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProductsToDisplay(response.data.data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const subtotal = productsToDisplay.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const shippingFee = 0; // Shipping fee can be updated as needed
  const total = subtotal + shippingFee;

  const handleOrderSubmit = async () => {
  const shippingAddress = `${country}, ${province}, ${city}, ${detailAddress}, ${postalCode}`;
  const transactionData = {
    total_price: total,
    shipping_address: shippingAddress,
    shipping_method: shippingMethod,
    payment_method: paymentMethod,
    status: "processed",
  };

  let transactionId;
  try {
    // Create the transaction
    const createdTransaction = await axios.post(
      "http://localhost:8000/api/transaction/create",
      {
        status: "pending",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    transactionId = createdTransaction.data.transaction_id;
    console.log("Transaction created successfully:", createdTransaction.data);
  } catch (error) {
    console.error("Failed to create transaction:", error);
    alert("Failed to create transaction. Please try again.");
    return; // Stop further execution if creation fails
  }

  try {
    // Update the transaction
    const response = await axios.put(
      `http://localhost:8000/api/transaction/update/${transactionId}`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Transaction updated successfully!");
    console.log(response.data);
  } catch (err) {
    console.error("Failed to update transaction:", err);
    alert("Failed to update transaction. Please try again.");
  }

   // Create transaction details for each selected product in the cart
  try {
    for (const product of selectedProducts) {
      const transactionDetailData = {
        transaction_id: transactionId,
        product_id: product.cart_id, // Assuming product.cart_id corresponds to product_id
        quantity: product.quantity,
        price: product.price * product.quantity, // Calculate price based on quantity
      };

      // Send a request to create the transaction detail
      await axios.post(
        "http://localhost:8000/api/transaction-detail/create",
        transactionDetailData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
    alert("Transaction and details created successfully!");
    console.log("Transaction details created successfully.");
    window.location.href = '/dashboard';
  } catch (err) {
    console.error("Failed to create transaction details:", err);
    alert("Failed to create transaction details. Please try again.");
  }
};


  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error if fetch fails
  }

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="col-span-2 bg-white p-6 rounded-md shadow">
            <h2 className="text-xl font-bold mb-4">Selected Products</h2>
            {productsToDisplay.length === 0 ? (
              <p>No products selected for checkout.</p>
            ) : (
              <div className='overflow-y-auto h-56'>
                {productsToDisplay.map((product) => (
                  <div key={product.cart_id} className="flex items-center justify-between mb-4">
                    <img src={product.image} alt={product.name} width={50} className="rounded-md" />
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p>Size: {product.size}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p className="text-sm text-gray-600">Price: Rp {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Address Input Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter your country"
                    className="w-full border rounded-md p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Province</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Enter your province"
                    className="w-full border rounded-md p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full border rounded-md p-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                    className="w-full border rounded-md p-2 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Detail Address</label>
                  <textarea
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="Enter detailed address"
                    className="w-full border rounded-md p-2 bg-white"
                    rows={3}
                  />
                </div>
                {/* Shipping Method Dropdown */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Shipping Method</label>
                  <select
                    className="w-full border rounded-md p-2 bg-white"
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  >
                    <option value="JNE">JNE</option>
                    <option value="JNT">JNT</option>
                    <option value="SICEPAT">SICEPAT</option>
                  </select>
                </div>
                {/* Payment Method Dropdown */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Payment Method</label>
                  <select
                    className="w-full border rounded-md p-2 bg-white"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="MANDIRI">MANDIRI</option>
                    <option value="BCA">BCA</option>
                    <option value="BANKJAGO">BANKJAGO</option>
                  </select>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping Fee (Ongkir)</span>
                <span>Rp {shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-black text-lg mt-4">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-2 px-4 rounded-md font-bold mt-4 hover:bg-gray-800"
              onClick={handleOrderSubmit}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOutPage;
