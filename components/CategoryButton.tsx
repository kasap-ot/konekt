import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from 'styles/Colors';
import { EventCategory } from 'types';

interface CategoryButtonProps {
  category: EventCategory;
  onPress: (category: EventCategory) => void;
  style?: ViewStyle;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(category)}>
    <Text style={styles.buttonText}>{category}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
});

export default CategoryButton;