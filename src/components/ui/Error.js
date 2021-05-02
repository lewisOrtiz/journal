import React from 'react';
import PropTypes from 'prop-types';
export const Error = ({ message }) => {
  return (
    <div className="ui__error-container">
      <p className="ui__error-text">{message}</p>
    </div>
  );
};
Error.propTypes = {
  message: PropTypes.string.isRequired,
};
