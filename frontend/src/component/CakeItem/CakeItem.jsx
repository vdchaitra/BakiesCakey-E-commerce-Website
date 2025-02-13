import React, { useContext } from 'react';
import './CakeItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const CakeItem = ({ id, name, kg, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart, wishlist, toggleWishlist ,url} = useContext(StoreContext);
  
  return (
    <div className='cake_item'>
      <div className="cake_item_img_container">
        <img src={url+"/images/"+image} alt="" className="cake_item_image" />
        <img
          className='wishlist'
          onClick={() => toggleWishlist(id)}
          src={wishlist[id] ? assets.wishlist_filled : assets.wisheart}
          alt="wishlist"
        />
        {
          !cartItem[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add" />
          : <div className='cake_item_counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
              <p>{cartItem[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
            </div>
        }
      </div>
      <div className="cake_item_info">
        <div className="cake_item_name_rating">
          <p>{name} ({kg})</p>
        </div>
        <p className="cake_item_desc">{description}</p>
        <p className="cake_item_price">₹{price}</p>
      </div>
    </div>
  );
};

export default CakeItem;
