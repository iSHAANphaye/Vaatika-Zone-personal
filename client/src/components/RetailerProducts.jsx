import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Importing the heart icons
import "../RetailerProducts.css";
import { apples, banana, tomato } from "../assets";
import { Link } from "react-router-dom";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Apples",
    category: "Fruit",
    image: apples,
    inStock: "10 kg",
    price: "50/kg",
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruit",
    image: banana,
    inStock: "15 kg",
    price: "30/kg",
  },
  {
    id: 3,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 4,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 5,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 6,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 7,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 8,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 9,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 10,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 11,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 12,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 13,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 14,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 15,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 16,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 17,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 18,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 19,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 20,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 21,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 22,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 23,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 24,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 25,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 26,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 27,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 28,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 29,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 30,
    name: "Tomato",
    category: "Vegetable",
    image: tomato,
    inStock: "5 kg",
    price: "28/kg",
  },
  {
    id: 31,
    name: "Banana",
    category: "Fruit",
    image: banana,
    inStock: "15 kg",
    price: "30/kg",
  },
  {
    id: 32,
    name: "Banana",
    category: "Fruit",
    image: banana,
    inStock: "15 kg",
    price: "30/kg",
  },
  {
    id: 33,
    name: "Banana",
    category: "Fruit",
    image: banana,
    inStock: "15 kg",
    price: "30/kg",
  },
  // Add more products as needed
];

const RetailerProducts = () => {
  // State to keep track of favorited products
  const [favorites, setFavorites] = useState([]);

  // Function to handle toggle of favorite
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      // Remove product from favorites
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      // Add product to favorites
      setFavorites([...favorites, productId]);
    }
  };

  const [sortBy, setSortBy] = useState(""); // State to track selected sorting option
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  // Function to handle sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search action
  const handleSearch = () => {
    // Perform search action here
    console.log("Search button clicked:", searchQuery);
  };

  // Function to sort products based on the selected option
  const sortProducts = (products) => {
    switch (sortBy) {
      case "category":
        return products
          .slice()
          .sort((a, b) => a.category.localeCompare(b.category));
      case "price":
        return products
          .slice()
          .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "quantity":
        return products
          .slice()
          .sort((a, b) => parseFloat(a.inStock) - parseFloat(b.inStock));
      default:
        return products;
    }
  };

  // Function to filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  // Filter and sort products
  const filteredAndSortedProducts = sortProducts(filterProducts(products));

  return (
    <div>
      <h1 className="heading">All Available Products</h1>
      {/* Filter and search bar */}
      <div className="retailer-filter-search-bar">
        <div className="retailer-filter-bar">
          <h2>Filter:</h2>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        {/* Search bar */}
        <div className="retailer-search-bar">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="retailer-product-container">
        {filteredAndSortedProducts.map((product) => (
          <Link
            key={product.id}
            to={"/retailerdashboard/retailerproductdetails/${product.id}"}
            className="product-link"
          >
            <div className="retailer-product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="retailer-product-details">
                <h3 className="retailer-product-name">{product.name}</h3>
                <p className="retailer-product-category">
                  Category: {product.category}
                </p>
                <p className="retailer-product-stock">
                  In Stock: {product.inStock}
                </p>
                <p className="retailer-product-price">
                  Price: Rs.{product.price}
                </p>
              </div>
              {/* Render filled heart icon if product is in favorites, otherwise render outlined heart */}
              {favorites.includes(product.id) ? (
                <AiFillHeart
                  className="retailer-favorite-icon"
                  onClick={() => toggleFavorite(product.id)}
                  style={{ color: "red" }}
                />
              ) : (
                <AiOutlineHeart
                  className="retailer-favorite-icon"
                  onClick={() => toggleFavorite(product.id)}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RetailerProducts;
