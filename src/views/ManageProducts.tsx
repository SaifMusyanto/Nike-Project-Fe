import React, { useState, useEffect } from 'react';
import { Router, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define Product interface
interface Product {
  id: number;
  name: string;
  category: { name: string };
  price: number;
  image: string;
}

// Define Category interface
interface Category {
  id: number;
  name: string;
}

// Define Series interface
interface Series {
  id: number;
  name: string;
}

interface Size {
  size: string;
  stock: string;
}

interface FormData {
  name: string;
  category_id: number | null;
  series_id: number | null;
  price: string;
  description: string;
  tag: string;
  specification: string[];
  images: File[];
}

const ManageProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    category_id: null,
    series_id: null,
    price: '',
    description: '',
    tag: '',
    specification: [''],
    images: [],
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    axios
      .get('http://localhost:8000/api/admin-product', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error('Error fetching products:', error);
        navigate('/login');
      });
      
      

    // Fetch categories
    axios
      .get('http://localhost:8000/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      axios
        .get(`http://localhost:8000/api/categories/${selectedCategory}/series`)
        .then((response) => setSeries(response.data))
        .catch((error) => console.error('Error fetching series:', error));
    } else {
      setSeries([]);
    }
  }, [selectedCategory]);

  const handleSpecificationChange = (index: number, value: string) => {
    const updatedSpecifications = [...formData.specification];
    updatedSpecifications[index] = value;
    setFormData({ ...formData, specification: updatedSpecifications });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    setFormData({ ...formData, images: [event.target.files[0]] }); // Single image
  }
};

const handleSubmit = () => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('description', formData.description);
  data.append('price', formData.price);
  data.append('tag', formData.tag);
  data.append('category_id', String(formData.category_id || ''));
  data.append('series_id', String(formData.series_id || ''));

  // Append single image
  if (formData.images.length > 0) {
    data.append('image', formData.images[0]);
  }

  formData.specification.forEach((spec, index) => {
    data.append(`specification[${index}]`, spec);
  });

  axios
    .post('http://localhost:8000/api/add-product', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      alert('Product added successfully!');
      setProducts((prev) => [...prev, response.data.product]);
      setFormData({
        name: '',
        category_id: null,
        series_id: null,
        price: '',
        description: '',
        tag: '',
        specification: [''],
        images: [],
      });
      setIsFormVisible(false);
    })
    .catch((error) => {
      console.error('Error adding product:', error);
      alert(error.response?.data.message || 'Failed to add product');
    });
};


  return (
    <div className="bg-gray-50 min-h-screen w-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        {isFormVisible ? 'Hide Form' : 'Add Product'}
      </button>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-md shadow-md mb-8">
          <h2 className="text-lg font-bold mb-4">Add New Product</h2>
          <form className="space-y-4">
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Product Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border border-gray-300 rounded-md p-2"
                placeholder="Enter product name"
              />
            </div>

            {/* Category Selection */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Category:</label>
              <select
                value={formData.category_id || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10) || null;
                  setFormData({ ...formData, category_id: value });
                  setSelectedCategory(value);
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

            {/* Series Selection */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Series:</label>
              <select
                value={formData.series_id || ''}
                onChange={(e) =>
                  setFormData({ ...formData, series_id: parseInt(e.target.value, 10) || null })
                }
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

            {/* Price Input */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Price:</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-white border border-gray-300 rounded-md p-2"
                placeholder="Enter price"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white border border-gray-300 rounded-md p-2"
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* Tag */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Tag:</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="bg-white border border-gray-300 rounded-md p-2"
                placeholder="Enter tag (e.g., Trending)"
              />
            </div>

            {/* Specifications */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Specifications:</label>
              {formData.specification.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => handleSpecificationChange(index, e.target.value)}
                    className="bg-white border border-gray-300 rounded-md p-2 flex-grow"
                    placeholder="Enter specification"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSpecifications = [...formData.specification];
                        updatedSpecifications.splice(index, 1);
                        setFormData({ ...formData, specification: updatedSpecifications });
                      }}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, specification: [...formData.specification, ''] })
                }
                className="text-white"
              >
                Add Specification
              </button>
            </div>

            {/* Images */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Images:</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="bg-white border border-gray-300 rounded-md p-2"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-back text-white px-4 py-2 rounded mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Existing Products</h2>
        <div className="grid grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-md">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <h3 className="text-md font-semibold">{product.name}</h3>
              <p>{product.category?.name || 'No category'}</p>
              <p>{product.price}</p>
              <button
                onClick={() => {
                  axios
                    .delete(`http://localhost:8000/api/delete-product/${product.id}`, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    })
                    .then(() => {
                      setProducts((prev) =>
                        prev.filter((p) => p.id !== product.id)
                      );
                      alert('Product deleted successfully');
                    })
                    .catch((error) => {
                      console.error('Error deleting product:', error);
                      alert('Failed to delete product');
                    });
                }}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete
              </button>
              {/* Add Edit Button */}
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
