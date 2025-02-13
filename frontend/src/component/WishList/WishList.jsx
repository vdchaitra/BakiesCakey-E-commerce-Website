import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import CakeItem from '../CakeItem/CakeItem';
import './WishList.css';

const Wishlist = () => {
  const { cake_list, wishlist } = useContext(StoreContext);

  // Filter the items that are in the wishlist
  const wishlistItems = cake_list.filter(cake => wishlist[cake._id]);

  return (
    <div className='occasion_display' id='occasion_display'>
      <div className="show">
        <h2>Your Wishlist</h2>
      </div>
      <div className="occasion_display_list">
      {wishlistItems.length > 0 ? (
        <div className='cake_list'>
          {wishlistItems.map(cake => (
            <CakeItem
              key={cake._id}
              id={cake._id}
              name={cake.name}
              kg={cake.kg}
              description={cake.description}
              price={cake.price}
              image={cake.image}
            />
          ))}
        </div>
        
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
    </div>
  );
};

export default Wishlist;
