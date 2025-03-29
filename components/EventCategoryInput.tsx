import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../styles/globalStyles';

interface CategoryInputProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ selectedValue, onValueChange }) => {
  return (
    <>
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          <Picker.Item label="Parties" value="Parties" />
          <Picker.Item label="Sport Events" value="Sport Events" />
          <Picker.Item label="Educational Events" value="Educational Events" />
        </Picker>
      </View>
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
  pickerContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: '#FFFFFF',
  },
});

export default CategoryInput;