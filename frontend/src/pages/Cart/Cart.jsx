import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {
  const { cartItem, cake_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const selectedCakes = cake_list.filter(item => cartItem[item._id] > 0);

  return (
    <div className='cart'>
      <div className="cart_items">
        <div className="cart_items_title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {selectedCakes.map((item, index) => (
          <div key={index}>
            <div className='cart_items_title cart_items_item'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{cartItem[item._id]}</p>
              <p>₹{item.price * cartItem[item._id]}</p>
              <p className='cross' onClick={() => removeFromCart(item._id)}><img src={assets.delete_icon} alt="" />Remove</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="cart_bottom">
        <div className="cart_total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart_total_detail">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <div className="cart_total_detail">
              <p>Delivery fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 45}</p>
            </div>
            <hr />
            <div className="cart_total_detail">
              <p>Total</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 45}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className="cart_promocode">
          <div>
            <p>If you have a promo code, <b>please enter it here.</b></p>
            <div className="cart_promocode_input">
              <input type="text" placeholder='Promo code here....' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
