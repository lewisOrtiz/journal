import React from 'react';
import star from '../../assets/star.svg';

export const JuornalContent = () => {
  return (
    <div className="journal__content">
      <div style={{ textAlign: 'center' }}>
        <img src={star} alt="star" />
        <p>Select something or create an new entry!</p>
      </div>
    </div>
  );
};
