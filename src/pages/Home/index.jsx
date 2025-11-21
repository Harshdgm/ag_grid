import React from 'react';
import helloImg from '../../Images/hello.png'; // import image

export default function Index() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',   
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        textAlign: 'center',
      }}
    >
      <img
        src={helloImg}
        alt="Hello"
        style={{ width: '200px', height: 'auto', marginTop: '20px' }} 
      />
      <h1>Hello From AG-Grid & Virtualization</h1>
    </div>
  );
}
