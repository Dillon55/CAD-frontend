// App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductList from './components/ProductList.jsx';
import NewProduct from './components/NewProduct.jsx';
import EditProduct from './components/EditProduct.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/new" element={<NewProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;