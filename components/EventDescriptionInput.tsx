import React from 'react';
import FormTextInput from './FormTextInput';

interface DescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChangeText }) => {
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