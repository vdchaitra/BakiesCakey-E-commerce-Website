import React, { useState } from 'react'
import './Header.css'
import { assets } from '../../../assets/assets'
const Header = () => {
    const [currentSlide, setCurrentSlide]=useState(0)
    const slides=[
        {
            id:0,
            content:(
            <>
                <span>Get Ready to Taste Happiness at Bakies Cakery!</span>
                <h3>love at 1st bite</h3>
                <a href="/menu" className="btn">Buy Now</a>
            </>
            ),
            img:assets.slide_img1,
        },
        {
            id:1,
            content:(
            <>
                <span>Customize Ordering</span>
                
            </>
            ),
            img:assets.slide_img2,
        },
        {
            id:2,
            content:(
            <>
                <span>Fast Delivery</span>
                
            </>
            ),
            img:assets.slide_img3,
        },
    ];
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      };
    
      const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
      };
  return (
    <div className='header'>
        <div className='header-contents'>
            
                {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${currentSlide === index ? 'active' : ''}`}
                >
                    <div className="content">{slide.content}</div>
                    <div className="img">
                        <img decoding="async" src={slide.img} alt="" />
                    </div>
                </div>
            
        ))}

        <div id="next-slide" className="fas fa-angle-right" onClick={nextSlide}></div>
        <div id="prev-slide" className="fas fa-angle-left" onClick={prevSlide}></div>

			

      </div>
    </div>
  )
}

export default Header
