import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.put(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status:", error);
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={order._id} className='order-item'>
            <img src={assets.parcel} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>

              <p className="order-item-name">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{`${order.address.street},`}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              {/* Conditionally render order message */}
              {order.address.message ? (
                <p className='order-item-message'><b><u>{order.address.message}</u></b></p>
              ) : null}
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Cake Processing">Cake Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Order Delivered">Order Delivered</option>
              <option value="Order Cancelled">Order Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
