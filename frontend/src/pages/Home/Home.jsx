import React, { useState } from 'react'
import './Home.css'
import Header from '../../component/Navbar/Header/Header'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'

import Blog from '../../component/Blog/Blog'
import Occasions from '../../component/Occasions/Occasions'
import Price from '../../component/Price/Price'



const Home = () => {
  const [category,setCategory]=useState("All")
  return (
    <div >
      <Header/>
      
      <a href="\menu"><ExploreMenu category={category} setCategory={setCategory} /></a>

     <a href="\occasions"><Occasions category={category} setCategory={setCategory} /></a>
      <a href="\Price"><Price category={category} setCategory={setCategory}/></a>
     
      <Blog/>
    </div>
  )
}

export default Home
