import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cake_list, cartItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const url = "http://localhost:4000";

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    message:""
  });

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Placing order...");

    // Check if cartItems is not an object or is empty
    if (!cartItem || typeof cartItem !== 'object' || Object.keys(cartItem).length === 0) {
      console.error('cartItems is not properly initialized or empty.');
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    // Filter and map order items from cake_list and cartItems
    let orderItems = cake_list.map((item) => {
      const itemId = item?._id;
      const quantity = cartItem[itemId] || 0;
      if (quantity > 0) {
        return {
          ...item,
          quantity: quantity
        };
      }
      return null;
    }).filter(item => item !== null);

    if (orderItems.length === 0) {
      console.error('No valid items to order.');
      alert('Your cart does not contain any items. Please add items before placing an order.');
      return;
    }

    let orderData = {
      userId: token, // assuming token is the userId
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 45,
    };

    try {
      // Make an API call to your server to create a new order
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      console.log("Order placed response:", response.data);

      if (response.data.success) {
        // Redirect to myOrders page after successful order placement
        navigate('/myOrders');
        
        // Initialize Razorpay payment
        const options = {
          key: 'rzp_test_ZRet0DOI69GCWa', // Replace with your Razorpay Key ID
          amount: orderData.amount * 100, // Amount is in paise
          currency: 'INR',
          name: 'BACKIES CAKERY',
          description: 'Payment for your order',
          image: '/src/assets/logo.png',
          order_id: response.data.order_id, // Order ID from the server
          handler: function (response) {
            // Handle success payment response
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            alert('Payment successful!');
          },
          prefill: {
            name: data.firstName + ' ' + data.lastName,
            email: data.email,
            contact: data.phone
          },
          notes: {
            address: data.street + ', ' + data.city + ', ' + data.state + ' - ' + data.zipcode
          },
          theme: {
            color: '#3399cc'
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <form onSubmit={placeOrder} className='place_order'>
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi_fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi_fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        <div className="multi_fields">
          <textarea required name="message"  id="message" onChange={onChangeHandler} value={data.message} placeholder='any specific need' rows="3" cols="60"></textarea>
        </div>
      </div>
      <div className="place_order_right">
        <div className="cart_total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart_total_detail">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <div className="cart_total_detail">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 45}</p>
            </div>
            <hr />
            <div className="cart_total_detail">
              <p>Total</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 45}</p>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
