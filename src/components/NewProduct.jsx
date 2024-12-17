import { useState } from 'react';
import ProductForm from './ProductForm';
import { createProduct } from '../lib/api/shop';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
  const [value, setValue] = useState({ name: '', price: '', brand: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      console.log('Submitting product:', value); // Debugging log
      await createProduct(value); // Call API to create product
      navigate('/'); // Redirect after successful submission
    } catch (error) {
      console.error('Error adding product:', error); // Log any error
    }
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="Add"
      />
    </div>
  );
}

export default NewProduct;
