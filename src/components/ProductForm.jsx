function ProductForm({ handleChange, handleSubmit, value, buttonType }) {
  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={value.name || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={value.price || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={value.brand || ''}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
  {buttonType}
</button>
    </form>
  );
}

export default ProductForm;
