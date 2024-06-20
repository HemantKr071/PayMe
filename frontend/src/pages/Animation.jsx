import React from 'react';
import Lottie from 'react-lottie';
import animationData from './PaymentAnimation.json'; // Replace with your animation file path

export function Animation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={250}
          width={250}
        />
      </div>
    );
  }
  