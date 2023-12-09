import React from 'react';

export default function Bar({number, i, scale, calcWidth, calcFont} : any) {
  return (
    <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id={i} key={i} style={{height: `${scale}`, width: `${calcWidth}`, fontSize:`${calcFont}`}}>
        {number}
    </div>
  );
}