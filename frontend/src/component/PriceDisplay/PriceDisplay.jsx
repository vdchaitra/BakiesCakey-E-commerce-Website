import React, { useContext } from 'react';
import './PriceDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import CakeItem from '../CakeItem/CakeItem';

const PriceDisplay = ({ category }) => {
  const { cake_list } = useContext(StoreContext);

  return (
    <div className='occasion_display' id='price_display'>
      <div className="view">
        <h2>Enjoy pocket-friendly treats.</h2>
      </div>
      <div className="cake_display_list">
        {cake_list.map((item, index) => {
          if (category >= item.price) {
            return (
              <CakeItem
                key={index}
                id={item._id}
                name={item.name}
                kg={item.kg}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PriceDisplay;
