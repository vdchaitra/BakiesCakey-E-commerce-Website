import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [trackOrderId, setTrackOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel} alt="" />
            <p>{order.items.map((item, index) => (
              index === order.items.length - 1 ?
                `${item.name} x ${item.quantity}` :
                `${item.name} x ${item.quantity}, `
            ))}</p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={() => setTrackOrderId(order._id)}>Track Order</button>
          </div>
        ))}
      </div>
      {trackOrderId && (
        <div className='order-tracking'>
          <h3>Tracking Order ID: {trackOrderId}</h3>
          
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d964.2158847250902!2d74.1393330695572!3d14.832914899105091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe61288bb186db%3A0x20941a9c982e30eb!2sPandurang%20General%20Store!5e0!3m2!1sen!2sin!4v1720875228085!5m2!1sen!2sin" 
          width="600"
           height="450" 
           style={{border:0}}
           allowfullscreen="" 
           loading="lazy" 
           referrerpolicy="no-referrer-when-downgrade">
            
           </iframe>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
