import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define interfaces for Product and Categories/Series
interface Product {
  name: string;
  description: string;
  price: string;
  tag: string;
  category_id: number | null;
  series_id: number | null;
  image: string | null;
}

interface Category {
  id: number;
  name: string;
}

interface Series {
  id: number;
  name: string;
}

interface ProductSize {
  size: string;
  stock: number;
}

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    tag: '',
    category_id: null,
    series_id: null,
    image: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // Add this new state for managing additional images
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);


    // New state for sizes and stock
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [newSize, setNewSize] = useState<string>('');
  const [newStock, setNewStock] = useState<number>(0);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setProduct(response.data.product);
        console.log(`product ${response}`);
        // Fetch series for the selected category
        if (response.data.product.category_id) {
          axios
            .get(`http://localhost:8000/api/categories/${response.data.product.category_id}/series`)
            .then((res) => setSeries(res.data));
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setErrorMessage('Failed to load product data. Please try again later.');
      });
  }, [id]);

  // Fetch categories
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setErrorMessage('Failed to load categories. Please try again later.');
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate number of images
      if (newImages.length + files.length > 10) {
        setImageError('You can upload a maximum of 10 images.');
        return;
      }

      // Validate image file types
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const invalidFiles = files.filter((file) => !validTypes.includes(file.type));
      if (invalidFiles.length > 0) {
        setImageError('Only JPEG, PNG, and GIF files are allowed.');
        return;
      }

      // Validate file sizes (e.g., max 5MB per image)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = files.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setImageError('Each file must be less than 5MB.');
        return;
      }

      setImageError(null); // Clear errors if all validations pass
      setNewImages([...newImages, ...files]);
    }
  };


  // Handle image upload to the server
  const handleUploadImages = () => {
    if (newImages.length === 0) {
      setImageError('No images selected for upload.');
      return;
    }

    setImageError(null); // Clear previous errors
    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append('images[]', image);
    });

    axios
      .post(`http://localhost:8000/api/product/${id}/images`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('Images uploaded successfully!');
        setNewImages([]);
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
        
        if (error.response) {
          setImageError(error.response.data.message || 'Failed to upload images.');
        } else if (error.request) {
          setImageError('No response from the server. Please check your connection.');
        } else {
          setImageError('An error occurred during the upload.');
        }
      });
  };


  // Handle size and stock input changes
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewSize(e.target.value);
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewStock(Number(e.target.value));

  // Add new size and stock to the sizes list
  const handleAddSize = () => {
    if (newSize && newStock > 0) {
      setSizes([...sizes, { size: newSize, stock: newStock }]);
      setNewSize('');
      setNewStock(0);
    }
  };

  // Save sizes and stock to the server
const handleSaveSizes = () => {
      // Set a flag to check if all requests are successful
    let allSizesSaved = true;

    // Loop over each size and stock and send it to the server
    sizes.forEach((size, index) => {
      axios
        .post(`http://localhost:8000/api/size/set/${id}`, {
          product_id: id,  // Add the product_id here
          size: size.size,
          stock: size.stock,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Size saved:', response.data);
          // For the last size, show the success alert
          if (index === sizes.length - 1) {
            alert('Sizes and stock saved successfully!');
          }
        })
        .catch((error) => {
          console.error('Error saving size:', error);

          // Check if error response exists
          if (error.response) {
            console.log('Error response:', error.response.data);
            alert('Failed to save sizes: ' + error.response.data.message || 'An unknown error occurred.');
          } else if (error.request) {
            alert('No response from the server.');
          } else {
            alert('Error: ' + error.message);
          }
        });
    });

    // If all sizes are saved successfully, show success alert at the end
    if (allSizesSaved) {
      alert('Sizes and stock saved successfully!');
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('tag', product.tag);
    formData.append('category_id', String(product.category_id || ''));
    formData.append('series_id', String(product.series_id || ''));
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    axios
      .put(`http://localhost:8000/api/edit-product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Product updated successfully!');
        navigate('/admin'); // Navigate back to product management
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        // Show error message
        if (error.response) {
          navigate('/login');
          // Server error response
          alert(error.response.data.message);
          setErrorMessage(error.response.data.message || 'Failed to update product. Please try again later.');
        } else if (error.request) {
          // No response received
          alert('No response from the server. Please check your connection.');
        } else {
          // Other errors
          alert('An error occurred while updating the product.');
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {/* Show error message if exists */}
      {errorMessage && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{errorMessage}</div>}

      <form className="space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Category:</label>
          <select
            name="category_id"
            value={product.category_id || ''}
            onChange={(e) => {
              handleInputChange(e);
              const categoryId = parseInt(e.target.value, 10);
              axios
                .get(`http://localhost:8000/api/categories/${categoryId}/series`)
                .then((res) => setSeries(res.data));
            }}
            className="bg-white border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Series */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Series:</label>
          <select
            name="series_id"
            value={product.series_id || ''}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Series</option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.name}
              </option>
            ))}
          </select>
        </div>

        {/* Size and Stock Section */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Size and Stock:</label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newSize}
              onChange={handleSizeChange}
              placeholder="Size"
              className="bg-white border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              value={newStock}
              onChange={handleStockChange}
              placeholder="Stock"
              className="bg-white border border-gray-300 rounded-md p-2"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Size
            </button>
          </div>
        </div>

        {/* Display added sizes */}
        <div className="mt-4">
          <ul>
            {sizes.map((size, index) => (
              <li key={index}>
                Size: {size.size}, Stock: {size.stock}
              </li>
            ))}
          </ul>
        </div>

        {/* Save Size and Stock */}
        <button
          type="button"
          onClick={handleSaveSizes}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save Size and Stock
        </button>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-md p-2"
            rows={4}
          />
        </div>

        {/* Tag */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Tag:</label>
          <input
            type="text"
            name="tag"
            value={product.tag}
            onChange={handleInputChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Cover Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Add Multiple Images */}
        <div className="flex flex-col mt-4">
          <label className="font-semibold mb-1">Upload Images (Max: 10):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="bg-white border border-gray-300 rounded-md p-2"
          />
          <button
            type="button"
            onClick={handleUploadImages}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Upload Images
          </button>
          {imageError && (
            <div className="bg-red-100 text-red-800 p-2 rounded mt-2">
              {imageError}
            </div>
          )}

          {/* Preview selected images */}
          <div className="flex space-x-2 mt-4">
            {newImages.map((image, index) => (
              <div key={index} className="w-20 h-20 border border-gray-300 overflow-hidden">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>


        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
