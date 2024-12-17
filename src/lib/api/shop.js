// actor.js

import client from './client';


// get
export const getList = () => {
  return client.get('/products');
};

// detail
export const getDetail = (id) => {
  return client.get(`/products/${id}`);
};

// create
export const createProduct = (params) => {
  return client.post('/products', params);
};

// update
export const updateProduct = (id, params) => {
  return client.put(`/products/${id}`, params);
};

// delete
export const deleteProduct = (id) => {
  return client.delete(`/products/${id}`);
};