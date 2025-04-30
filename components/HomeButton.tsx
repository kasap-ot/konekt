import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from 'styles/Colors';

interface HomeButtonProps {
  title: string;
  onPress: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.accent.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeButton;