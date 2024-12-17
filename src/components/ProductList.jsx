import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // Import React-Select
import { getList, deleteProduct } from '../lib/api/shop';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getList();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Sort options for React-Select
  const sortOptions = [
    { value: 'asc', label: 'Price: Low to High' },
    { value: 'desc', label: 'Price: High to Low' },
  ];

  // Handle sort order change
  const handleSortChange = (selectedOption) => {
    setSortOrder(selectedOption.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => navigate('/new')}>
          Add Product
        </button>
        {/* React-Select Dropdown */}
        <Select
          options={sortOptions}
          onChange={handleSortChange}
          defaultValue={sortOptions[0]} // Set default option
          className="w-50"
        />
      </div>
      <div className="mb-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or brand"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <div className="row">
        {sortedProducts.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">ID: {product.id}</h5>
                <p className="card-text">Name: {product.name}</p>

                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Brand: {product.brand}</p>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
