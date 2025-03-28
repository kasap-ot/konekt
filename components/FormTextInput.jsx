import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';

const FormTextInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  multiline = false 
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          multiline && styles.multilineInput
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  multilineInput: {
    height: 120,
  },
});

export default FormTextInput;