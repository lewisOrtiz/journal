import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = (newState=initialState) => {
    setValues(newState);
  };

  return { values, handleChange, resetForm };
};
