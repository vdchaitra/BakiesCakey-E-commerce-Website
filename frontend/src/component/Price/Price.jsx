import React from 'react';
import './Price.css';
import { price_list } from '../../assets/assets';

const Price = ({ category, setCategory }) => {

  return (
    <>
    <div className='price_menu_list' id='price_menu_list'>
        <h1>budget buys</h1>
        
        <div className="price_list">
            {price_list.map((item,index) => {
                return (
                    <div onClick={() => setCategory(prev => prev === item.price || 600 === item.price ? 600 : item.price)} key={index} className="explore_menu_list_item">
                      <img className={category===item.price? "active" : ""} src={item.price_image} alt="menu" />
                      
                    </div>
                );
            })}
        </div>
      
    </div>
    </>
  );
};

export default Price;
