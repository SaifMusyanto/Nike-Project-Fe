import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { CartContext } from "./component/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState<any>(null);
  const [sizes, setSizes] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details
        const productRes = await fetch(`http://localhost:8000/api/product/${id}`);
        const productData = await productRes.json();

        if (!productData.status) throw new Error(productData.message);

        setProduct(productData.product);

        // Fetch sizes
        const sizeRes = await fetch(`http://localhost:8000/api/size/${id}`);
        const sizeData = await sizeRes.json();

        if (sizeData.status) {
          setSizes(sizeData.sizes);
          setSelectedSize(sizeData.sizes[0]?.size || null);
        }

        // Fetch images
        const imageRes = await fetch(`http://localhost:8000/api/image/${id}`);
        const imageData = await imageRes.json();

        if (imageData.status) {
          const imagePaths = imageData.images.map((img: any) => img.image_path);
          setImages(imagePaths);
          setSelectedImage(imagePaths[0] || null);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedImage) return;

    const cartData = {
      product_id: product.id,
      quantity: 1, // You can allow the user to select quantity if you want
      selected_size: selectedSize,
    };

    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming the token is stored in localStorage
        },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();
      if (data.status) {
        alert(data.message); // Success message
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      <Navbar />
      <div className="flex flex-row justify-center gap-4 mt-20">
        {/* Image Carousel */}
        <div className="product-image flex flex-row w-[40%] h-lvh">
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent flex flex-col gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                className={`w-[100px] rounded-lg cursor-pointer transition-transform ${
                  selectedImage === img ? "brightness-75" : "hover:brightness-75"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="w-full h-auto">
            {selectedImage && <img src={selectedImage} alt="Selected" />}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col w-[30%] gap-10">
          <section className="title">
            <h1>{product.name}</h1>
            <h3>{product.category?.name}</h3>
            <h2 className="font-bold">Rp {product.price}</h2>
          </section>

          <div>
            <h4>Select Size</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`bg-white border-2 p-2 rounded hover:border-black ${
                    selectedSize === size.id ? "border-black" : ""
                  }`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          <section className="button">
            <button onClick={handleAddToCart} className="bg-gray-300 w-full">
              Add to Bag
            </button>
          </section>

          <section className="description">
            <p>{product.description}</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
