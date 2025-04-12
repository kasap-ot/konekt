import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from 'styles/Colors';
import { EventCategory } from 'types';

interface CategoryInputProps {
  selectedValue: EventCategory;
  onValueChange: (itemValue: EventCategory) => void;
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
          <Picker.Item label="Party" value="Party" />
          <Picker.Item label="Sport" value="Sport" />
          <Picker.Item label="Education" value="Education" />
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