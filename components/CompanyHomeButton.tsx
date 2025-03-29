import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../styles/globalStyles';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  onPress, 
  title, 
  style, 
  textStyle,
  backgroundColor = Colors.accent.primary 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }, style]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
});

export default CustomButton;