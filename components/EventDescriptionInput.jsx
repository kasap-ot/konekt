import React from 'react';
import EventTextInput from './EventTextInput';

const DescriptionInput = ({ value, onChangeText }) => {
  return (
    <EventTextInput 
      label="Description"
      placeholder="Enter event description"
      value={value}
      onChangeText={onChangeText}
      multiline={true}
    />
  );
};

export default DescriptionInput;