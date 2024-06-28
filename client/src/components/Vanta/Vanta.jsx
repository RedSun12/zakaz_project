import { styled } from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.globe.min';

const VantaRingsBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null);
  console.log(myRef)

  useEffect(() => {
    // console.log(VANTA);
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 100,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xb2e817,
  color2: 0xb636b6,
  backgroundColor: 0x589658
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div ref={myRef} className='vanta' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
  </div>
};

export default VantaRingsBackground;
