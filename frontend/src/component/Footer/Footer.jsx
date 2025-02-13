import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer_content">
        <div className="footer_content_left">
            <img src={assets.cake_icon} alt="" />
            <h3>Follow us on social media to stay updated on our latest products, special offers, and baking tips. We love to see our creations at your celebrations, so don't forget to tag us in your photos!

Thank you for choosing Bakes Cakery. We look forward to baking something special for you!</h3>
            <div className='footer-social-icons'>
                <a href="https://youtube.com/@adiis.23?si=Sw07xgWKpRN3chtb "><img src={assets.youtube_icon} alt="" /></a>
                <a href=""><img src={assets.facebook_icon} alt="" /></a>
                <a href="https://www.instagram.com/bakies_cakery?igsh=MWR6bW96ZXd4Y3pmZg%3D%3D&utm_source=qr "><img src={assets.instagram_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer_content_center">
            <h2>Quick Link</h2>
            <ul>
              <a href="#"><li>Home</li></a>
              <a href="#blog"><li>About us</li></a>
              <a href="/cart"><li>Delivery</li></a>
              <li>privacy policy</li>
            </ul>
        </div>
        <div className="footer_content_right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-9606785079</li>
              <li>bakiescakery@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer_copyright">copyright 2024 @ BakiesCakary.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
