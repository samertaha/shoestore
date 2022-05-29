import React from 'react';
import { useParams } from 'react-router-dom';
import shoe1 from '../images/nike-shoes-1425208.jpg';
import shoe2 from '../images/shoes-1543886.jpg';
import shoe3 from '../images/shoes-1422387.jpg';

export default function Home() {
  const { id } = useParams();
  return (
    <div
      id='carouselExampleSlidesOnly'
      className='carousel slide'
      data-ride='carousel'
      style={{ width: '100%' }}
    >
      {id}
      <div className='carousel-inner'>
        <div
          className='carousel-item active'
          style={{ width: '100% !important' }}
        >
          <img
            className='d-block w-100'
            src={shoe1}
            style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
            alt='First slide'
          />
        </div>
        <div className='carousel-item'>
          <img
            className='d-block w-100'
            src={shoe2}
            style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
            alt='Second slide'
          />
        </div>
        <div className='carousel-item'>
          <img
            className='d-block w-100'
            src={shoe3}
            style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
            alt='Third slide'
          />
        </div>
      </div>
    </div>
  );
}
