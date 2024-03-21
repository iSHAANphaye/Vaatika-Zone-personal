import React, { useState, useEffect } from "react";
import "../AdminOrders.css";

const AdminOrders = () => {
  // Sample orders data
  const ordersData = [
    {
      id: 1,
      productName: "Apple",
      category: "Fruits",
      price: "$2.99",
      quantity: "10 kg",
      orderQuantity: "5 kg",
      orderDate: "2024-03-15",
      retailerName: "Retailer 1",
      orderStatus: "Pending",
    },
    {
      id: 2,
      productName: "Banana",
      category: "Fruits",
      price: "$1.99",
      quantity: "20 kg",
      orderQuantity: "10 kg",
      orderDate: "2024-03-14",
      retailerName: "Retailer 2",
      orderStatus: "Processing",
    },
    // Add more orders data here...
  ];

  // State to store orders and filtered orders
  const [orders, setOrders] = useState(ordersData);
  const [filteredOrders, setFilteredOrders] = useState(ordersData); // Set filteredOrders to ordersData initially
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    filterOrders();
  }, [orders, filterBy]);

  const filterOrders = () => {
    if (filterBy) {
      const filtered = orders.filter(
        (order) => order.orderStatus.toLowerCase() === filterBy.toLowerCase(),
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  useEffect(() => {
    sortOrders();
  }, [filteredOrders, sortBy]);

  const sortOrders = () => {
    const sorted = [...filteredOrders];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        break;
      case "price":
        sorted.sort(
          (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)),
        );
        break;
      case "quantity":
        sorted.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
        break;
      default:
        break;
    }
    setFilteredOrders(sorted);
  };

  const handleStatusUpdate = (orderId, status) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, orderStatus: status };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilterBy = (option) => {
    setFilterBy(option);
  };

  const handleSearch = () => {
    const searchResults = orders.filter((order) =>
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredOrders(searchResults);
  };

  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>
      {/* Filter bar */}
      <div className="filter-bar">
        <select value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
        <button onClick={() => handleFilterBy("Pending")}>
          Filter by Pending
        </button>
        <button onClick={() => handleFilterBy("Processing")}>
          Filter by Processing
        </button>
      </div>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Orders table */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Order Quantity</th>
            <th>Order Date</th>
            <th>Retailer Name</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.productName}</td>
              <td>{order.category}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.orderQuantity}</td>
              <td>{order.orderDate}</td>
              <td>{order.retailerName}</td>
              <td>
                {order.orderStatus}
                <input
                  type="text"
                  value={order.orderStatus}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleStatusUpdate(order.id, order.orderStatus)
                  }
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
