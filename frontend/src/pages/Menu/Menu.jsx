import React, { useState } from 'react';
import './Menu.css'; // Add CSS file for Menu styling
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
import CakeDisplay from '../../component/CakeDisplay/CakeDisplay'

const Menu = () => {
  const [category,setCategory]=useState("All")
  return (
    <div className='this'>

      <ExploreMenu category={category} setCategory={setCategory} />
      <CakeDisplay category={category}/>

    </div>
  )
}

export default Menu;
