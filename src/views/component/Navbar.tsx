import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from "./CartContext.tsx";
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Navbar: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


    const handleCheckboxChange = (product: any, isChecked: boolean) => {
        if (isChecked) {
            setSelectedProducts((prev) => [...prev, product]);
        } else {
            setSelectedProducts((prev) =>
                prev.filter((item) => item.id !== product.id || item.size !== product.size)
            );
        }
    };

    const handleCheckout = async () => {
        if (selectedProducts.length === 0) {
            alert("Please select at least one product to proceed.");
            return;
        }
        navigate(`/checkout/${id}`, { state: { selectedProducts } });

    };

    return (
        <div className="z-50 header sticky top-0">
            <section className={`bg-gray-50 h-auto lg:h-4 flex flex-row justify-end ${isScrolled ? 'hidden' : ''}`}>
                <a href="/login" className="text-xs mx-2 text-black hover:opacity-50">
                    login
                </a>{' '}
                |
                <a href="/register" className="text-xs mx-2 text-black hover:opacity-50">
                    Signup
                </a>
            </section>
            <nav
                className={`bg-gray-200 w-full h-120 lg:h-12 lg:flex-row flex flex-col lg:justify-between transition-opacity duration-300 ${
                    isScrolled ? 'opacity-90' : 'opacity-100'
                }`}
            >
                <img
                    src="src/assets/logo_nike.svg.png"
                    alt="logo"
                    className="w-[16%] ml-10 mt-[12px] lg:mt-0 lg:w-auto lg:h-auto lg:my-auto my-3"
                />

                {/* Categories Section */}
                <div className="relative group my-auto">
                    {/* Main Category List */}
                    <div className="categoryLists flex lg:flex-row flex-col text-3xl sm:text-3xl py-6 lg:py-0 px-8 lg:text-xs lg:gap-3 pl-[6vw]">
                        <ul className="flex lg:flex-row flex-col space-x-4 space-y-5 lg:space-y-0">
                            <li>
                                <a
                                    className="duration-100 cursor-pointer hover:border-b-2 border-solid border-black text-black pb-2"
                                    href=""
                                >
                                    Running Shoes
                                </a>
                            </li>
                            <li>
                                <a
                                    className="duration-100 cursor-pointer hover:border-b-2 border-solid border-black text-black pb-2"
                                    href=""
                                >
                                    Football Shoes
                                </a>
                            </li>
                            <li>
                                <a
                                    className="duration-100 cursor-pointer hover:border-b-2 border-solid border-black text-black pb-2"
                                    href=""
                                >
                                    Basketball Shoes
                                </a>
                            </li>
                            <li>
                                <a
                                    className="duration-100 cursor-pointer hover:border-b-2 border-solid border-black text-black pb-2"
                                    href=""
                                >
                                    Gym & Training Shoes
                                </a>
                            </li>
                            <li>
                                <a
                                    className="duration-100 cursor-pointer hover:border-b-2 border-solid border-black text-black pb-2"
                                    href=""
                                >
                                    Lifestyle Shoes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="dropDown hidden group-hover:block bg-gray-200 absolute w-[100vh] lg:mt-2 shadow-md mx-auto rounded-b-md animate-fade-slide">
                        <div className="py-4 px-6">
                            <ul className="flex lg:flex-row flex-col text-lg sm:text-md lg:text-xs lg:gap-10 justify-around">
                                <li>
                                    <a
                                        className="duration-100 cursor-pointer border-solid border-black text-black pb-2 font-bold"
                                        href="/display"
                                    >
                                        Running Shoes
                                    </a>
                                    <ul className="py-3">
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Vaporfly
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Pegasus
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Zoom
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Revolution
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        className="duration-100 cursor-pointer border-solid border-black text-black pb-2 font-bold"
                                        href="/display"
                                    >
                                        Football Shoes
                                    </a>
                                    <ul className="py-3">
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Mercurial
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Tiempo
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Phantom
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Vapor
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        className="duration-100 cursor-pointer border-solid border-black text-black pb-2 font-bold"
                                        href="/display"
                                    >
                                        Basketball
                                    </a>
                                    <ul className="py-3">
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Air Jordan
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Le Bron
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Luka
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                G.T.
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        className="duration-100 cursor-pointer border-solid border-black text-black pb-2 font-bold"
                                        href="/display"
                                    >
                                        Gym & Training
                                    </a>
                                    <ul className="py-3">
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Metcon
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Flex
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Air Max
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Reax
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        className="duration-100 cursor-pointer border-solid border-black text-black pb-2 font-bold"
                                        href="/display"
                                    >
                                        Lifestyle
                                    </a>
                                    <ul className="py-3">
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Court Vision
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Air Force
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                P-6000
                                            </a>
                                        </li>
                                        <li className="py-0.5">
                                            <a href="/display" className="text-gray-600 hover:text-black font-bold">
                                                Dunk Low
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="my-[12px] mr-9 flex">
                <img
                    className="cart h-5 my-auto pr-10 cursor-pointer"
                    src="https://img.icons8.com/?size=100&id=ySRi3OLgoOJX&format=png&color=000000"
                    alt="Cart"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                 <Link to="/history" className="flex items-center">
                    <img
                        className="cart h-5 my-auto pr-10 cursor-pointer"
                        src="https://img.icons8.com/?size=100&id=70294&format=png&color=000000"
                        alt="history"
                    />
                 </Link>
                </div>
            </nav>
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } w-1/5`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                    className="text-black font-bold bg-white"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    &times;
                </button>
                </div>
                <div className="p-4 flex flex-col justify-between h-[80%] overflow-y-auto">
                    <div>
                        {cart.length === 0 ? (
                            <p>No products added yet.</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item flex items-center justify-between py-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                    />
                                    <img src={item.image} alt={item.name} width={50} />
                                    <div className="flex-1 ml-4">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p>{item.price}</p>
                                        <p>Size: {item.size}</p>
                                        <div className="flex items-center">
                                            <button
                                                className="bg-gray-300 px-2 py-1 rounded"
                                                onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="bg-gray-300 px-2 py-1 rounded"
                                                onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="bg-white text-sm mt-2"
                                            onClick={() => removeFromCart(item.cart_id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                     {/* Checkout Button */}
                <button
                    className="bg-black relative text-white py-2 px-4 ml-10 rounded-xl w-[80%] mt-4"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
