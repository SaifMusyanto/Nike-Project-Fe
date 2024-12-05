import React, { useState, useEffect } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Display: React.FC = () => {
    const [visibleCategory, setVisibleCategory] = useState<string | null>(null);
    const [visibleSeries, setVisibleSeries] = useState<string | null>(null);
    const [visibleRows, setVisibleRows] = useState(3);
    const [filterTag, setFilterTag] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [products, setProducts] = useState<any[]>([]);  // To store the fetched products
    const [loading, setLoading] = useState<boolean>(true); // To track loading state
    const [error, setError] = useState<string | null>(null); // To store any error message

    // UseEffect hook for fetching products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/product');
                setProducts(response.data);  // Set the state with fetched products
                setLoading(false);  // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products');  // Set the error state
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);  // Empty dependency array means it runs once when the component mounts

    // Toggle category to show/hide series options
    const toggleCategory = (category: string) => {
        setVisibleCategory(visibleCategory === category ? null : category);
        setVisibleSeries(null);
    };

    const handleSeriesClick = (series: string) => {
        setVisibleSeries(series);
    };

    const categories = {
        Running: ['Vaporfly', 'Pegasus', 'Zoom', 'Revolution'],
        Football: ['Mercurial', 'Tiempo', 'Phantom', 'Vapor'],
        Basketball: ['Air Jordan', 'Le Bron', 'Luka', 'G.T.'],
        'Gym & Training': ['Metcon', 'Flex', 'Air Max', 'Reax'],
        Lifestyle: ['Court Vision', 'Air Force', 'P-6000', 'Dunk Low'],
    };

    // Filter and sort products based on category, series, and tag
    const filteredProducts = products
        .filter(
            (product) =>
                (visibleCategory === null || product.category.name === visibleCategory) &&
                (visibleSeries === null || product.series.name === visibleSeries) &&
                (filterTag === 'All' || product.tag === filterTag)
        )
        .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    const productsPerRow = 3;
    const visibleProducts = filteredProducts.slice(0, visibleRows * productsPerRow);

    return (
        <div className="bg-gray-50 min-h-screen w-screen">
            <Navbar />

            <div className="flex w-[95%]">
                <div className="sidebar fixed top-0 left-0 h-screen bg-white pt-[100px] w-1/5 flex flex-col pl-10">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    <ul className="bg-white w-4/5 h-auto rounded-lg shadow-md space-y-5 px-4 py-4 border-black">
                        {Object.keys(categories).map((category) => (
                            <li key={category} className="text-lg font-bold cursor-pointer">
                                <div onClick={() => toggleCategory(category)}>{category}</div>
                                {visibleCategory === category && (
                                    <ul className="pt-2 pl-4">
                                        {categories[category].map((series) => (
                                            <li
                                                key={series}
                                                className="text-sm hover:underline cursor-pointer"
                                                onClick={() => handleSeriesClick(series)}
                                            >
                                                {series}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ml-[20%] w-4/5 flex flex-col min-h-screen">
                    <div className="p-4 bg-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-gray-800 font-bold text-2xl">
                                {visibleSeries ? `${visibleSeries} Shoes` : visibleCategory ? `${visibleCategory} Shoes` : 'All Shoes'}
                            </h1>

                            <div className="flex space-x-4">
                                <select
                                    className="px-4 py-2 border rounded bg-white"
                                    value={filterTag}
                                    onChange={(e) => setFilterTag(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Bestseller">Bestseller</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Popular">Popular</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                </button>
                            </div>
                        </div>

                        {/* Loading and Error Handling */}
                        {loading && <p>Loading products...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="grid grid-cols-5 gap-4">
                            {visibleProducts.map((product) => (
                                <div key={product.id} className="bg-white shadow-md overflow-hidden rounded-md">
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                                        <div className="p-4">
                                            <span className="text-orange-500 font-bold">{product.tag}</span>
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <p className="text-gray-600">{product.category.name}</p>
                                            <p className="text-black font-bold">Rp {product.price.toLocaleString()}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {visibleProducts.length < filteredProducts.length && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => setVisibleRows(visibleRows + 1)}
                                    className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <section className='relative'>
                <Footer />
            </section>
        </div>
    );
};

export default Display;
