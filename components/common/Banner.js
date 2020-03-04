import React, { useEffect } from 'react';

const Banner = (props) => {
  useEffect(() => {
    loadBgImg(props.imgUrl || '/static/imgs/kobe.png')
  }, [])

  const loadBgImg = (imageUrl) => {
    const backgroundDOM = document.getElementById('background');
    const background = new Image();
    background.src = imageUrl;
    background.onload = () => {
      if (backgroundDOM) {
        backgroundDOM.style.cssText = `height: ${props.height}; opacity: 1; background-image: url(${
          background.src
        })`;
      }
    };
  };

  return (
    <section id="background" className="ad_wrapper" />
  )
}

export default Banner