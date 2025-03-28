import React from 'react';
import FormTextInput from './FormTextInput';

const DescriptionInput = ({ value, onChangeText }) => {
  return (
    <FormTextInput 
      label="Description"
      placeholder="Enter event description"
      value={value}
      onChangeText={onChangeText}
      multiline={true}
    />
  );
};

export default DescriptionInput;