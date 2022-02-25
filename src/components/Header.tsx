import React from 'react';
import '../styles/header.css';

export default function Header() {
  return (
      <div className="col-lg-8 p-auto m-auto header">
        <div className="col-lg-6">
          <img src="images/logo.png" alt="render" className="image-fluid" height="77" width="206"/>
        </div>
      </div>
  );
}