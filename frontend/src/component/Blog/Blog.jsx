import React from 'react';
import './Blog.css';
import { assets, video_list } from '../../assets/assets';

const Blog = () => {
  const handleMouseEnter = (event) => {
    event.target.play();
    event.target.nextSibling.style.display = 'none'; // Hide button when video starts playing
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
    event.target.nextSibling.style.display = 'block'; // Show button when video is paused
  };

  return (
    <div className='blog' id='blog'>
      <p>One cake a day, keeps stress away!</p>
      <div className="blog_list">
        {video_list.map((item, index) => (
          <div key={index} className="video-wrapper">
            <video
              width="750"
              height="500"
              autoFocus
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="video"
            >
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="play-button" onClick={(event) => event.currentTarget.previousSibling.play()}>
              <img src={assets.icon_play} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
