import { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import { getDetail, updateProduct } from '../lib/api/shop';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [value, setValue] = useState({ name: '', price: '', brand: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getDetail(id);
        setValue(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, value);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="Update"
      />
    </div>
  );
}

export default EditProduct;
