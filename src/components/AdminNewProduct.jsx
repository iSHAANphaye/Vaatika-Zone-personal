import React from 'react';
import '../AdminNewProduct.css'; // Import the CSS file

const AdminNewProduct = () => {
  console.log('Rendering AdminNewProduct component');
  return (
    <div className="AdminNewProductContainer">
      <h2>Add New Product</h2>
      <form>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" />

        <label htmlFor="productCategory">Product Category:</label>
        <input type="text" id="productCategory" name="productCategory" />

        <label htmlFor="productPrice">Product Price:</label>
        <input type="text" id="productPrice" name="productPrice" />

        <label htmlFor="productQuantity"><br/>In Stock Quantity:</label>
        <input type="text" id="productQuantity" name="productQuantity" />

        <label htmlFor="productDescription">Product Description:</label>
        <textarea id="productDescription" name="productDescription" rows="4" cols="50"></textarea>

        <label htmlFor="productImage">Product Image:</label>
        <input type="file" id="productImage" name="productImage" />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminNewProduct;
